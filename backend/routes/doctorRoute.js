import express from 'express';
import { doctorList,loginDoctor,appointmentsDoctor,updatePayment,cancelAppointmentDoctor,markAppointmentCompleted ,doctorDashboard, docctorProfile,updateDoctorProfile} from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';

const doctorRouter=express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments', authDoctor,appointmentsDoctor)
doctorRouter.post('/update-payment', authDoctor,updatePayment)
doctorRouter.post('/cancel-appointment', authDoctor, cancelAppointmentDoctor)
doctorRouter.post('/mark-appointment', authDoctor, markAppointmentCompleted)
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)
doctorRouter.get('/profile',authDoctor, docctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)

export default doctorRouter
