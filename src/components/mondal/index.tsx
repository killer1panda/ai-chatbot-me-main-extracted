import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ArrowBigLeftIcon, ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'

type Props = {
  trigger: React.ReactNode
  children: React.ReactNode
  title: string
  description: string
  type?: 'Integration'
  logo?: string
}

const Modal = ({
  trigger,
  children,
  title,
  description,
  type,
  logo,
}: Props) => {
  switch (type) {
    case 'Integration':
      return (
        <Dialog>
          <DialogTrigger className="w-full text-left">{trigger}</DialogTrigger>
          <DialogContent className="bg-white dark:bg-slate-950">
            <div className="flex justify-center gap-3 mb-4">
              <div className="w-12 h-12 relative">
                <Image
                  src={`https://ucarecdn.com/2c9bd4ab-1f00-41df-bad2-df668f65a232/`}
                  fill
                  alt="Corinna"
                />
              </div>
              <div className="text-gray-400 flex gap-2">
                <ArrowLeft size={20} />
                <ArrowRight size={20} />
              </div>
              <div className="w-12 h-12 relative">
                <Image
                  src={`https://ucarecdn.com/${logo}/`}
                  fill
                  alt="Stripe"
                />
              </div>
            </div>
            <DialogHeader className="flex flex-col items-center text-center">
              <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
              <DialogDescription className="text-center mt-2 text-base">
                {description}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6">
              {children}
            </div>
          </DialogContent>
        </Dialog>
      )
    default:
      return (
        <Dialog>
          <DialogTrigger className="w-full text-left">{trigger}</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl">{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            {children}
          </DialogContent>
        </Dialog>
      )
  }
}

export default Modal