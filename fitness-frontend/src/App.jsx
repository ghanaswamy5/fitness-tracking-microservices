import { Box, Button } from '@mui/material'
import './App.css'
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from 'react-oauth2-code-pkce'
import { useDispatch } from 'react-redux'
import { logout, setCredentials } from './store/authSlice'
import ActivityForm from './components/ActivityForm'
import ActivityList from './components/ActivityList'
import ActivityDetail from './components/ActivityDetail'

const ActivitiesPage = () => {
  return(
    <Box sx={{ p: 2, border: '1px dashed grey' }}>
      <ActivityForm onActivityAdded={()=>window.location.reload()}/>
      <ActivityList/>
    </Box>
  );
}

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
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
        <Button variant='contained' onClick={logout}>
          LOGOUT
        </Button>
        <Routes>
            <Route path='/activities' element={<ActivitiesPage/>}/>
            <Route path='/activities/:id' element={<ActivityDetail/>}/>
            <Route path='/' element={token ? <Navigate to = "/activities" replace/>: <div>Welcome! Please Login</div>}/>
        </Routes>
    </Box>
      </div>
    )}
  </Router>
  )
}

export default App
