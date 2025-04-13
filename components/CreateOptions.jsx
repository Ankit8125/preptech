import { Phone, Video } from 'lucide-react'
import React from 'react'

const CreateOptions = () => {
  return (
    <div>
      <div>
        <Video />
        <h2>Create New Interview</h2>
        <p>Create AI Interviews and schedule them with candidates</p>
      </div>
      <div>
        <Phone />
        <h2>Create Phone Screening Call</h2>
        <p>Schedule Phone screening call with candidates</p>
      </div>
    </div>
  )
}

export default CreateOptions