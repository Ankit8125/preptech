import AppSidebar from '@/components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import WelcomeContainer from '@/components/WelcomeContainer'
import React from 'react'

const DashboardProvider = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div>
        <SidebarTrigger/>
        <WelcomeContainer /> 
        {children}
      </div>
    </SidebarProvider>
  )
}

export default DashboardProvider