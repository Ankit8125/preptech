import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ArrowLeft, Clock, Copy, List, Mail, Plus } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import Image from 'next/image'

const InterviewLink = ({ formData, interview_id }) => {

  const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview_id

  const getInterviewLink = () => {
    return url
  }

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(url)
    toast('Link Copied')
  }

  return (
    <div>
      <Image src={'/tick.png'} height={50} width={50} alt='Completed'/>
      <h2>Your AI Interview is ready</h2>
      <p> Share this link with the candidate to start the interview process </p>

      <div>
        <div>
          <h2>Interview Link</h2>
          <h2>Valid for 30 days</h2>

        </div>
        <div>
          <Input defaultValue={getInterviewLink()} disabled={true} />
          <Button onClick={() => handleCopyLink()} > <Copy /> Copy Link </Button>
        </div>
        <hr />

        <div>
          <h2> <Clock /> {formData?.duration} </h2>
          <h2> <List /> {formData?.duration} </h2>
        </div>
      </div>

      <div>
        <h2>Share via</h2>
        <div>
          <Button> <Mail /> Email </Button>
          <Button> <Mail /> Whatsapp </Button>
        </div>
      </div>

      <div>
        <Link href={'/dashboard'}>
          <Button> <ArrowLeft /> Back to Dashboard </Button>
        </Link>
        <Link href={'/create-interview'}>
          <Button> <Plus /> Create New Interview </Button>
        </Link>
      </div>
    </div>
  )
}

export default InterviewLink