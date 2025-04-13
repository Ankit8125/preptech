import Image from 'next/image'
import React from 'react'

const InterviewHeader = () => {
  return (
    <div>
      <Image src={'/logo.jpg'} alt='logo' width={200} height={100} />
    </div>
  )
}

export default InterviewHeader