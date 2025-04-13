'use client'

import Image from "next/image"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import { SidebarOptions } from "@/Constants"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AppSidebar() {

  const path = usePathname()
  console.log(path);


  return (
    <Sidebar>
      <SidebarHeader>
        <Image src={'/logo.jpg'} alt="Logo" width={200} height={200} />
        <Button> <Plus /> Create New Interview </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {
                SidebarOptions.map((option, index) => (
                  < SidebarMenuItem key={index} >
                    {/* Change color when I am on that specific path */}
                    <SidebarMenuButton asChild>
                      <Link href={option.path}>
                        <option.icon />
                        <span>{option.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              }
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent >
      <SidebarFooter />
    </Sidebar >
  )
}
