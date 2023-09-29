import './App.css';
import { Route, Routes } from "react-router-dom";
import IsLogged from './views/auth/isLogged';
import Register from './views/auth/Register';
import Login from './views/auth/Login';
import LandingPage from './views/LandingPage';
import Home from './views/Home';
import { BrowserRouter as Router } from "react-router-dom";
import {  useEffect, useState } from 'react';
import { api } from './api';
import { ValueContext } from './context';

function App() {
  const [userDetails, setUserDetails] = useState({
    logged: false,
    userId: ''
  })
  useEffect(() => {
    const authCheck = async () => {
      try {
        const { data } = await api.get('/user/auth')
        console.log(data)
        setUserDetails({
          logged: true,
          userId: data.userId
        })
      } catch (error) {
        console.log(error)
      }
    }
    authCheck()
  }, [])
  return (
    <ValueContext.Provider value={{userDetails,setUserDetails}}>
      <Router>
        <Routes>
          <Route element={<IsLogged />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </ValueContext.Provider>
  );
}

export default App;