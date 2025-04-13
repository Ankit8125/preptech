'use client'

import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import React from 'react'

const Login = () => {

  const signInWithGoogle = async () => {
    const { error } = supabase.auth.signInWithOAuth({ provider: 'google' })
    if (error) console.log("Error while signing in", error.message);

  }

  return (
    <div>
      <div>
        <div>
          <h2>Welcome to PrepTech</h2>
          <p>Sign In With Google Authentication</p>
          <Button
            onClick={signInWithGoogle}
          >
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login