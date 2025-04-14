'use client'

import InterviewHeader from '@/components/InterviewHeader'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import React, { useState } from 'react'

const InterviewLayout = ({ children }) => {

  const [interviewInfo, setInterviewInfo] = useState()

  return (
    <InterviewDataContext.Provider value={{ interviewInfo, setInterviewInfo }} >
      <div>
        <InterviewHeader />
        {children}
      </div>
    </InterviewDataContext.Provider>
  )
}

export default InterviewLayout