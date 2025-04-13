import InterviewHeader from '@/components/InterviewHeader'
import React from 'react'

const InterviewLayout = ({ children }) => {
  return (
    <div>
      <InterviewHeader />
      {children}
    </div>
  )
}

export default InterviewLayout