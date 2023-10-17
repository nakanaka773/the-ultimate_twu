import { Button } from '@mui/material'
import React from 'react'
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

function SignIn() {
    function signInWithGoogle(){
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    }
  return (
        <div>
              <IconButton
                onClick={signInWithGoogle}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"

                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>

  )
}

export default SignIn