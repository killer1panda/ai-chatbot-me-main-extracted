import React, { JSX } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer'

type Props = {
  onOpen: JSX.Element
  children: React.ReactNode
  title: string
  description: string
}

const AppDrawer = ({ children, description, onOpen, title }: Props) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{onOpen}</DrawerTrigger>
      <DrawerContent>
        <div className="w-full px-6 pb-10 pt-6 md:px-10 md:pt-8">
          <div className="flex flex-col items-center gap-2">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </div>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default AppDrawer