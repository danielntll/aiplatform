"use client"
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MessageSquare, ImageIcon, VideoIcon, MusicIcon, CodeIcon, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10"
  },
  {
    label: "Image generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10"
  },
  {
    label: "Video generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10"
  },
  {
    label: "Music generation",
    icon: MusicIcon,
    href: "/music",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10"
  },
  {
    label: "Code generation",
    icon: CodeIcon,
    href: "/code",
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
]



const DashboardPage = () => {
  const router = useRouter();
  const handleOpenPage = (path: string) => {
    router.push(path);
  }
  return (
    <div>
      <div className='mb-8 space-y-4'>
        <h2 className='text-2xl md:text-4xl font-bold text-center'>
          EXPLORE AI
        </h2>
        <p className='text-center terxt-muted-foreground font-light text-sm md:text-lg'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, fuga!
        </p>
      </div>
      <div className='px-4 md:px-20 lg:px-32 space-y-4'>
        {tools.map((tool) => {
          return (
            <Card
              onClick={() => handleOpenPage(tool.href)}
              key={tool.href}
              className='p-4 border-black/5 flex items-center justify-between hover:shadow-sm transition cursor-pointer'
            >
              <div className='flex items-center gap-x-4'>
                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                  <tool.icon className={cn("w-8 h-8", tool.color)} />
                </div>
              </div>
              <div className='font-semibold'>
                {tool.label}
              </div>
              <ArrowRight className='w-5 h-5' />
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default DashboardPage;