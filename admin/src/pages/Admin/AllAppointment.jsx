import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointment = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge } = useContext(AppContext)

  // const slotDateFormat = (slotDate) => {
  //   const dateArray = slotDate.split('_')
  //   const day = dateArray[0]
  //   const month = dateArray[1]
  //   const year = dateArray[2]
  //   return `${day}/${month}/${year}`
  // }
  const slotDateFormat = (slotDate) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const dateArray = slotDate.split('_')
    const day = dateArray[0]
    const month = months[Number(dateArray[1]) - 1] // convert "9" -> "Sep"
    const year = dateArray[2]

    return `${day}/${month}/${year}`
  }

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <div className='flex justify-between items-center mb-3'>
        <p className='text-lg font-medium'>All Appointments</p>
        <button onClick={getAllAppointments} className='px-4 py-2 bg-primary text-white rounded'>Refresh</button>
      </div>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.map((item, index) => (
          // <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b items-center' key={index}>
          //   <p>{index + 1}</p>
          //   <div className='flex items-center gap-2'>
          //     <img className='w-8 h-8 rounded-full' src={item.userData?.image} alt="" />
          //     <p>{item.userData?.name}</p>
          //   </div>
            // <p>{calculateAge(item.userData?.dob)}</p>
          //   <p>{slotDateFormat(item.slotDate)} {item.slotTime}</p>
          //   <div className='flex items-center gap-2'>
          //     <img className='w-8 h-8 rounded-full' src={item.docData?.image} alt="" />
          //     <p>{item.docData?.name}</p>
          //   </div>
          //   <p>${item.amount}</p>
          //   <div className='flex gap-2'>
          //     {item.cancelled ? <p className='text-red-500'>Cancelled</p> : <button onClick={() => cancelAppointment(item._id)} className='text-red-500'>Cancel</button>}
          //   </div>

          // </div>
          <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b items-center' key={index}>
  <p>{index + 1}</p>
  <div className='flex items-center gap-2'>
    <img className='w-8 h-8 rounded-full' src={item.userData?.image} alt="" />
    <p>{item.userData?.name}</p>
  </div>
  {/*  Age here */}
  <p>{item.userData?.dob ? calculateAge(item.userData.dob) : "N/A"}</p>
  <p>{slotDateFormat(item.slotDate)} {item.slotTime}</p>
  <div className='flex items-center gap-2'>
    <img className='w-8 h-8 rounded-full' src={item.docData?.image} alt="" />
    <p>{item.docData?.name}</p>
  </div>
  <p>${item.amount}</p>
  <div className='flex gap-2'>
    {item.cancelled 
      ? <p className='text-red-500'>Cancelled</p> 
      : item.isCompleted 
      ? <p className='text-green-500'>Comleted</p> : <button onClick={() => cancelAppointment(item._id)} className='text-red-500'><img className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" /></button>
    }
  </div>
</div>

        ))}

      </div>
    </div>
  )
}

export default AllAppointment
