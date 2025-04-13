import AppSidebar from '@/components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

const DashboardProvider = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div>
        <SidebarTrigger/>
        {children}
      </div>
    </SidebarProvider>
  )
}

export default DashboardProvider