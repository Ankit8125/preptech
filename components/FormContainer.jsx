import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { InterviewType } from '@/Constants'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'

const FormContainer = ({ onHandleInputChange }) => {

  const [interviewType, setInterviewType] = useState([])

  // Had to do like this, so that when I click a selected interview type, it gets deselected
  const AddInterviewType = (type) => {
    const data = interviewType.includes(type)
    if (!data) setInterviewType(prev => [...prev, type])
    else {
      const result = interviewType.filter(item => item != type)
      setInterviewType(result)
    }
  }

  useEffect(() => {
    if (interviewType) {
      onHandleInputChange('type', interviewType)
    }
  }, [])

  return (
    <div>
      <div>
        <h2> Job Position </h2>
        <Input
          placeholder='e.g. Full Stack Developer'
          onChange={(event) => onHandleInputChange('jobPosition', event.target.value)}
        />
      </div>

      <div>
        <h2> Job Description </h2>
        <Textarea
          placeholder='Enter Job Description'
          onChange={(event) => onHandleInputChange('jobDescription', event.target.value)}
        />
      </div>

      <div>
        <h2> Interview Duration </h2>
        <Select
          onValueChange={(value) => onHandleInputChange('duration', value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5 Min">5 Mins</SelectItem>
            <SelectItem value="15 Min">15 Mins</SelectItem>
            <SelectItem value="30 Min">30 Mins</SelectItem>
            <SelectItem value="45 Min">45 Mins</SelectItem>
            <SelectItem value="60 Min">60 Mins</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h2> Interview Type </h2>
        <div>
          {
            InterviewType.map((type, index) => (
              <div
                key={index}
                onClick={() => AddInterviewType(type.title)}
              >
                <type.icon />
                <span>{type.title}</span>
              </div>
            ))
          }
        </div>
      </div>

      <div>
        <Button> Generate Question <ArrowRight /> </Button>
      </div>
    </div>
  )
}

export default FormContainer