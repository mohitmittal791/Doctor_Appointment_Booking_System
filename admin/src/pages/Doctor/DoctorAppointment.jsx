import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments, updatePaymentStatus, cancelAppointment, markAppointmentCompleted } = useContext(DoctorContext)
  const { calculateAge } = useContext(AppContext)

  const slotDateFormat = (slotDate) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const dateArray = slotDate.split('_')
    const day = dateArray[0]
    const month = months[parseInt(dateArray[1]) - 1]
    const year = dateArray[2]
    return `${day}/${month}/${year}`
  }

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.map((item, index) => (
          <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] py-3 px-6 border-b items-center' key={index}>
            <p>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 h-8 rounded-full' src={item.userData?.image} alt="" />
              <p>{item.userData?.name}</p>
            </div>
            <p>{item.payment ? 'Online' : 'CASH'}</p>
            <p>{calculateAge(item.userData?.dob)}</p>
            <p>{slotDateFormat(item.slotDate)} {item.slotTime}</p>
            <p>${item.amount}</p>
            {/* <div className='flex flex-col gap-1'>
              <p className={item.cancelled ? 'text-red-500' : item.isCompleted ? 'text-green-500' : 'text-blue-500'}>
                {item.cancelled ? 'Cancelled' : item.isCompleted ? 'Completed' : 'Pending'}
              </p>
              {!item.cancelled && (
                <div className='flex gap-2'>
                  <button onClick={() => cancelAppointment(item._id)} className='ml-2'>
                    <img className='w-5 h-5' src={assets.cancel_icon} alt="Cancel Appointment" />
                  </button>
                  <button onClick={() => markAppointmentCompleted(item._id)} className='ml-2'>
                    <img className='w-5 h-5' src={assets.tick_icon} alt="Mark Appointment Completed" />
                  </button>
                </div>
              )}
            </div> */}
            <div className="flex flex-col gap-1 items-center">
  <p
    className={`font-medium ${
      item.cancelled
        ? 'text-red-500'
        : item.isCompleted
        ? 'text-green-500'
        : 'text-blue-500'
    }`}
  >
    {item.cancelled
      ? 'Cancelled'
      : item.isCompleted
      ? 'Completed'
      : 'Pending'}
  </p>

  {!item.cancelled && !item.isCompleted && (
    <div className="flex gap-3 mt-1">
      {/* Cancel button */}
      <button
        onClick={() => cancelAppointment(item._id)}
        className="p-2 rounded-full hover:bg-red-100 transition"
        title="Cancel Appointment"
      >
        <img className="w-7  h-7" src={assets.cancel_icon} alt="Cancel" />
      </button>

      {/* Mark Completed button */}
      <button
        onClick={() => markAppointmentCompleted(item._id)}
        className="p-2 rounded-full hover:bg-green-100 transition"
        title="Mark Completed"
      >
        <img className="w-7 h-7 " src={assets.tick_icon} alt="Complete" />
      </button>
    </div>
  )}
</div>

            
            
          </div>
        ))}

        {/* Mobile view */}
        {appointments.map((item, index) => (
          <div className='sm:hidden p-4 border-b' key={index}>
            <div className='flex items-center gap-2 mb-2'>
              <img className='w-10 h-10 rounded-full' src={item.userData?.image} alt="" />
              <div>
                <p className='font-medium'>{item.userData?.name}</p>
                <p className='text-sm text-gray-600'>{calculateAge(item.userData?.dob)} years</p>
              </div>
            </div>
            <div className='text-sm'>
              <p>Date: {slotDateFormat(item.slotDate)} {item.slotTime}</p>
              <p>Fees: ${item.amount}</p>
              <p>Payment: {item.payment ? 'Online' : 'CASH'}</p>
              <p>Status: {item.cancelled ? 'Cancelled' : item.isCompleted ? 'Completed' : 'Pending'}</p>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default DoctorAppointment
