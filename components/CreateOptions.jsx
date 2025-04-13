import { Phone, Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CreateOptions = () => {
  return (
    <div>
      <Link href={'/dashboard/create-interview'}>
        <Video />
        <h2>Create New Interview</h2>
        <p>Create AI Interviews and schedule them with candidates</p>
      </Link>
      <div>
        <Phone />
        <h2>Create Phone Screening Call</h2>
        <p>Schedule Phone screening call with candidates</p>
      </div>
    </div>
  )
}

export default CreateOptions