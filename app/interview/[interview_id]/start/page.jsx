'use client'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { Mic, Phone, Timer } from 'lucide-react'
import Image from 'next/image'
import React, { useContext } from 'react'

const StartInterview = () => {

  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext)

  return (
    <div>
      <h2>
        AI Interview Session
        <span> <Timer /> 00.00.00 </span>
      </h2>
      
      <div>
        <div>
          <Image src={'/ai.jpg'} alt='Ai interviewer' height={100} width={100} />
          <h2>AI Recruiter</h2>
        </div>
        <div>
          <h2>{interviewInfo?.userName[0]}</h2>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>
      <div>
        <Mic />
        <Phone />
      </div>
      <h2>Interview in Progress...</h2>
    </div>
  )
}

export default StartInterview