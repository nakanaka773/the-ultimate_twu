import { Button } from '@mui/material'
import React from 'react'
import { auth } from '../firebase'

export default function SignOut() {
  return (
    <div>
        <Button onClick={() => auth.signOut()}>
            <p className='text-white'>サインアウト</p>
        </Button>
    </div>
  )
}
