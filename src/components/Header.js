import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { auth} from './../firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from './SignIn';
import SignOut from './SignOut';


export default function MenuAppBar() {
  const [user] = useAuthState(auth);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ color: "#e0f2f1", backgroundColor: "#01579b" }}>
        <Toolbar>
          <Typography className='text-3xl' variant="h4" component="div" sx={{ flexGrow: 1 }}>
            究極の二択
          </Typography>
          {user ? <SignOut />:<SignIn />}
        </Toolbar>
        
      </AppBar>
    </Box>
  );
}