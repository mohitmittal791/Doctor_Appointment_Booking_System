import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointment from './pages/Admin/AllAppointment';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';


const App = () => {
  const {aToken} = useContext(AdminContext)
  const {dToken} =useContext(DoctorContext)
  return aToken || dToken ? (
    <div className='bg-[#F8F9FA]'>
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          {/* admin route */}
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard></Dashboard>}/>
          <Route path='/all-appointment' element={<AllAppointment></AllAppointment>}/>
          <Route path='/add-doctor' element={<AddDoctor></AddDoctor>}/>
          <Route path='/doctor-list' element={<DoctorsList></DoctorsList>}/>

          {/* doctor route */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard></DoctorDashboard>}/>
          <Route path='/doctor-appointment' element={<DoctorAppointment></DoctorAppointment>}/>
          <Route path='/doctor-profile' element={<DoctorProfile></DoctorProfile>}/>






        </Routes>
        
      </div>
    </div>
  ):(
    <>
    <Login/>
    <ToastContainer/>
    </>
  )
}

export default App
