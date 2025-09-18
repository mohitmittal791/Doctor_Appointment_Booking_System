import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, updateProfile } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [formData, setFormData] = useState({
    fees: '',
    addressLine1: '',
    addressLine2: '',
    available: false
  })

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  useEffect(() => {
    if (profileData) {
      setFormData({
        fees: profileData.fees || '',
        addressLine1: profileData.address?.line1 || '',
        addressLine2: profileData.address?.line2 || '',
        available: profileData.available || false
      })
    }
  }, [profileData])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSave = () => {
    const updatedData = {
      fees: formData.fees,
      address: {
        line1: formData.addressLine1,
        line2: formData.addressLine2
      },
      available: formData.available
    }
    updateProfile(profileData._id, updatedData)
    setIsEdit(false)
  }

  return profileData && (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-primary/80 w-40 h-40 sm:w-60 sm:h-60 object-cover rounded-lg' src={profileData.image} alt="" />
        </div>
        <div className='flex-1 border-stone-100 rounded-lg p-8 py-7 bg-white'>
          {/* {doc info} */}
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p className=''>{profileData.degree}-{profileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
          </div>

          {/* doc about */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
            <p className='text-sm text-gray-600 mt-1 max-w-[700px]'>{profileData.about}</p>
          </div>

          {!isEdit ? (
            <>
              <p className='text-gray-600 font-medium mt-4'>Appointment fee: <span className='text-gray-800'>{currency} {profileData.fees}</span></p>
              <div className='flex gap-2 py-2'>
                <p>Address:</p>
                <p className='text-sm'>{profileData.address.line1} <br />
                  {profileData.address.line2}
                </p>
              </div>
              <div className='flex gap-1 pt-2'>
                <input checked={profileData.available} type="checkbox" readOnly />
                <label>Available</label>
              </div>
              <button onClick={() => setIsEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
            </>
          ) : (
            <>
              <div className='flex flex-col gap-2 mt-4'>
                <label>Appointment fee:</label>
                <input type="number" name="fees" value={formData.fees} onChange={handleChange} className='border p-1 rounded' />
              </div>
              <div className='flex flex-col gap-2 mt-4'>
                <label>Address Line 1:</label>
                <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} className='border p-1 rounded' />
              </div>
              <div className='flex flex-col gap-2 mt-4'>
                <label>Address Line 2:</label>
                <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} className='border p-1 rounded' />
              </div>
              <div className='flex items-center gap-2 mt-4'>
                <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} />
                <label>Available</label>
              </div>
              <button onClick={handleSave} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
              <button onClick={() => setIsEdit(false)} className='px-4 py-1 border border-gray-400 text-sm rounded-full mt-5 ml-2 hover:bg-gray-200 transition-all'>Cancel</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
