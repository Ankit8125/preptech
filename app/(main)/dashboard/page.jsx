import CreateOptions from '@/components/CreateOptions'
import LatestInterviewsList from '@/components/LatestInterviewsList'
import WelcomeContainer from '@/components/WelcomeContainer'
import React from 'react'

const Dashboard = () => {
  return (
    <div>
      <WelcomeContainer />
      <h2>Dashboard</h2>
      <CreateOptions />
      <LatestInterviewsList />
    </div>
  )
}

export default Dashboard