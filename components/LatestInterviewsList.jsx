'use client'
import { Video } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'

const LatestInterviewsList = () => {
  
  const [interviewList, setInterviewList] = useState([])

  return (
    <div>
      <h2>Previously Created Interviews</h2>
      
      {
        interviewList?.length == 0 && 
        <div>
          <Video />
          <h2>You don't have any interview created!</h2>
          <Button>+ Create New Interview</Button>
        </div>
      }
    </div>
  )
}

export default LatestInterviewsList