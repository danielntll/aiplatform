"use client"

import axios from "axios"
import Heading from "@/components/heading";
import { MessageSquare } from 'lucide-react'
import { useForm } from "react-hook-form";
import * as z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ChatCompletioRequestMessage } from 'openai'
import Empty from "@/components/empty";
import Loader from "@/components/loader";


const ConversationPage = () => {

  const router = useRouter();

  const [messages, setMessages] = useState<ChatCompletioRequestMessage[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (val: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletioRequestMessage = {
        role: "user",
        content: val.prompt
      }
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages
      });

      setMessages((current) => [...current, userMessage, response.data])

      form.reset();
    } catch (error) {
      console.log("ERROR", error)
    } finally {
      router.refresh();
    }
  }

  return (
    <div>
      <Heading
        title={"Chat"}
        description={"OPEN AI"}
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full- p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) =>
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl
                    className="m-0 p-0"
                  >
                    <Input
                      className="
                        border-0 
                        outline-none 
                        focus-visible:ring-0 
                        focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Qual è la tabellina del 9?"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              }
            />
            <Button
              className="col-span-12 lg:col-span-2 w-full"
              disabled={isLoading}
            >
              Generate
            </Button>

          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4">

        {messages.length === 0 && !isLoading && (
          <div>
            <Empty label="No chat started!" />
          </div>
        )}
        <div className="flex flex-col-reverse gap-y-4 p-8">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.map((message, index) => {
            return (
              <div
                key={index}
                className="whitespace-pre-wrap">
                {message.content}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default ConversationPage;