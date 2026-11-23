import { Button } from '@mui/material'
import './App.css'
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from 'react-oauth2-code-pkce'
import { useDispatch } from 'react-redux'
import { setCredentials } from './store/authSlice'

function App() {  
  
  const{token , tokenData, logIn, logOut, isAuthenticated} 
      = useContext(AuthContext);
  const dispath = useDispatch();
  const[authReady, setAuthReady]  = useState(false);

  useEffect(() => {
    if(token){
      dispath(setCredentials({token, user: tokenData}))
      setAuthReady(true); 
    }
  }, [token, tokenData,dispath]);
  
  return (
  <Router>
    {!token ? (
    <Button variant="contained" 
    onClick={() => {logIn();}}>
      Login
    </Button>
    ) : (
      <div>
        <pre>
          {JSON.stringify(tokenData,null,2)}
          {token}
        </pre>
      </div>
    )}
  </Router>
  )
}

export default App
