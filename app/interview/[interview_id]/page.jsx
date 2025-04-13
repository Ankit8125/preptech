'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/services/supabaseClient'
import { Clock, Video } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Interview = () => {

  const { interview_id } = useParams()
  console.log(interview_id);

  const [interviewData, setInterviewData] = useState()
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState()

  const getInterviewDetails = async () => {
    setLoading(true)

    try {
      let { data: Interviews, error } = await supabase
        .from('Interviews')
        .select("jobPosition, jobDescription, duration, type")
        .eq("interview_id", interview_id)

      console.log(Interviews);
      setInterviewData(Interviews[0])
      setLoading(false)

      if(Interviews?.length == 0){
        toast('Incorrect Inteview Link')
        return
      }

    } catch (error) {
      toast("Incorrect Interview Link")
      setLoading(false)
    }
  }

  useEffect(() => {
    interview_id && getInterviewDetails()
  }, [interview_id])

  return (
    <div>
      <div>
        <Image src={'/logo.jpg'} alt='logo' width={200} height={100} />
        <h2>AI-Powered Interview Platform</h2>

        <h2>{interviewData?.jobPosition}</h2>
        <h2> <Clock /> {interviewData?.duration} </h2>

        <div>
          <h2> Enter your full name </h2>
          <Input 
          placeholder='e.g. Ankit Verma' 
          value = {userName || ''}
          onChange = {(event) => setUserName(event.target.value)}
          />
        </div>

        <div>
          <h2>Before you begin</h2>
          <ul>
            <li>Test your camera and microphone</li>
            <li>Ensure you have a stable internet connection</li>
            <li>Find a quiet place for interview</li>
          </ul>
        </div>

        <Button
        disabled = {loading || !userName || userName.length == 0}
        > <Video /> Join Interview </Button>
      </div>
    </div>
  )
}

export default Interview