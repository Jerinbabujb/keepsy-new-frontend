import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import {Toaster} from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Dashboard from './pages/dashboard';
import Send from './pages/send';
import Recieve from './pages/recieve';
import CodeGenerator from './pages/codeGenerator';
const App = () => {
  const {authUser}=useContext(AuthContext);
  return (
    <div  className="bg-[url('/assets/bgImage.svg')] bg-cover bg-no-repeat">
    <BrowserRouter>
    <Toaster/>
    <Routes>
      <Route path='/' element={authUser? <HomePage/>: <Navigate to="/login"/>}/>
      <Route path='/login' element={!authUser?<LoginPage/> :<Navigate to="/"/>}/>
      <Route path='/profile' element={authUser?<ProfilePage/>: <Navigate to="/login"/> }/>
    <Route path='/dashboard' element={authUser?<Dashboard/>: <Navigate to="/login"/> }/>
    <Route path='/send' element={authUser?<Send/>: <Navigate to="/login"/> }/>
     <Route path='/recieve' element={authUser?<Recieve/>: <Navigate to="/login"/> }/>
          <Route path='/codeGenerator' element={authUser?<CodeGenerator/>: <Navigate to="/login"/> }/>


    </Routes>
    </BrowserRouter>
    </div>
  )
}
export default App;
