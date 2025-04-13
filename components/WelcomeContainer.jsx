'use client'
import { useUser } from '@/app/provider'
import Image from 'next/image'
import React from 'react'

const WelcomeContainer = () => {

  const {user} = useUser()

  return (
    <div>
      <div className='p-10'>
        <h2>Welcome Back, {user?.name}</h2>
        <h2>AI-Driven Interviews</h2>
      </div>
      { user && <Image src={user?.picture} alt='userPhoto' width={40} height={40}/>}
    </div>
  )
}

export default WelcomeContainer