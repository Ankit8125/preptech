'use client'
import FormContainer from '@/components/FormContainer'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CreateInterview = () => {

  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState()

  const onHandleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    console.log("Formdata", formData);
    
  }

  return (
    <div>
      <div>
        <ArrowLeft onClick={() => router.back()} />
        <h2>Create New Interview</h2>
      </div>
      <Progress value={step * 33.33} />
      <FormContainer onHandleInputChange={onHandleInputChange} />
    </div>
  )
}

export default CreateInterview