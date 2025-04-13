'use client'
import FormContainer from '@/components/FormContainer'
import InterviewLink from '@/components/InterviewLink'
import QuestionList from '@/components/QuestionList'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

const CreateInterview = () => {

  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({})
  const [interviewId, setInterviewId] = useState()

  const onHandleInputChange = (field, value) => {
    setFormData(prev => {
      const newState = {
        ...prev,
        [field]: value
      };
      console.log("Updated Formdata will be:", newState);
      return newState;
    });
  }

  const onGoToNext = () => {
    if(!formData?.jobPosition){
      toast('Please enter the job position')
      return;
    }
    else if(!formData?.jobDescription){
      toast('Please enter the job description')
      return;
    }
    else if(!formData?.duration){
      toast('Please enter the interview duration')
      return;
    }else if(!formData?.type || formData?.type?.length === 0){
      toast('Please select the interview type')
      return;
    }
    setStep(step+1)
  }

  const onCreateLink = (interview_id) => {
    setInterviewId(interview_id)
    setStep(step+1)
  }

  return (
    <div>
      <div>
        <ArrowLeft onClick={() => router.back()} />
        <h2>Create New Interview</h2>
      </div>
      <Progress value={step * 33.33} />
      {
        step == 1 ? <FormContainer onHandleInputChange={onHandleInputChange} GoToNext={onGoToNext} />
        : 
        step == 2 ? <QuestionList  formData={formData} onCreateLink={(interview_id) => onCreateLink(interview_id)} />
        :
        step == 3 ? <InterviewLink formData={formData} interview_id={interviewId} />
        : null
      }
    </div>
  )
}

export default CreateInterview