import axios from 'axios'
import { Loader2, Loader2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from './ui/button'
import QuestionListContainer from './QuestionListContainer'
import { useUser } from '@/app/provider'
import {v4 as uuidv4} from 'uuid'
import { supabase } from '@/services/supabaseClient'

const QuestionList = ({ onCreateLink, formData }) => {
  const [loading, setLoading] = useState(false)
  const [questionList, setQuestionList] = useState([])
  const [saveLoading, setSaveLoading] = useState(false)
  const { user } = useUser()

  console.log("Came to questionList");

  const generateQuestionList = async () => {
    setLoading(true)

    try {
      console.log("Calling model with data:", formData);
      const result = await axios.post('/api/ai-model', {
        ...formData
      });

      // console.log("API response:", result.data);

      const content = result.data.content
      const jsonMatch = content.match(/```json([\s\S]+?)```/)
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response')
      }

      // Clean and parse JSON
      const jsonString = jsonMatch[1]
        .trim()
        .split('=')[1]          // Remove variable assignment
        .trim()
        .replace(/,$/, '')      // Remove trailing comma if exists

      setQuestionList(JSON.parse(jsonString))
      setLoading(false)

    } catch (error) {
      console.error("Request error:", error);
      toast('Server Error, Try Again!');
    } finally {
      setLoading(false);
    }
  }

  const handleFinish = async () => {
    setSaveLoading(true)
    const interview_id = uuidv4();
    const { data, error } = await supabase
      .from('Interviews')
      .insert([
        {
          ...formData,
          questionList: questionList,
          userEmail: user?.email,
          interview_id: interview_id
        },
      ])
      .select()

    console.log(data);
    setSaveLoading(false)
    
    onCreateLink(interview_id)
  }

  useEffect(() => {
    if (formData) generateQuestionList()
  }, [formData])

  return (
    <div>
      {loading && (
        <div>
          <Loader2Icon className='animate-spin'/>
          <div>
            <h2>Generating Interview Questions</h2>
            <p>AI is crafting personalized questions based on your entered details.</p>
          </div>
        </div>
      )}
      {questionList?.length > 0 && (
        <div>
          <QuestionListContainer questionList={questionList} />
        </div>
      )}
      <div>
        <Button onClick={() => handleFinish()} disabled={saveLoading || loading || questionList.length === 0}>
          {
            saveLoading && <Loader2 className='animate-spin'/>
          }
          Create Interview Link & Finish
        </Button>
      </div>
    </div>
  )
}

export default QuestionList
