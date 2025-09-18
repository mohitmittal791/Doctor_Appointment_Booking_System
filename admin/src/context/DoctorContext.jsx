import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {
  const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
  const [appointments, setAppointments] = useState([])
  const [dashData, setDashData] = useState(false)
  const [profileData, setProfileData] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/appointments', { headers: { dtoken: dToken } })
      if (data.success) {
        setAppointments(data.appointments)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const updatePaymentStatus = async (appointmentId, payment) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/doctor/update-payment', { appointmentId, payment }, { headers: { dtoken: dToken } })
      if (data.success) {
        toast.success(data.message)
        getAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { dtoken: dToken } })
      if (data.success) {
        toast.success(data.message)
        getAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const markAppointmentCompleted = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/doctor/mark-appointment', { appointmentId }, { headers: { dtoken: dToken } })
      if (data.success) {
        toast.success(data.message)
        getAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', { headers: { dtoken: dToken } })
      if (data.success) {
        setDashData(data.dashData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/profile', { headers: { dtoken: dToken } })
      if (data.success) {
        setProfileData(data.doctor)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const updateProfile = async (docId, data) => {
    try {
      const { data: response } = await axios.post(backendUrl + '/api/doctor/update-profile', { docId, ...data }, { headers: { dtoken: dToken } })
      if (response.success) {
        toast.success(response.message)
        getProfileData()
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const value = {
    dToken, setDToken,
    backendUrl,
    appointments, setAppointments, getAppointments,
    updatePaymentStatus, cancelAppointment, markAppointmentCompleted,
    dashData, setDashData, getDashData,
    profileData, setProfileData, getProfileData,
    updateProfile
  }

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  )
}

export default DoctorContextProvider
