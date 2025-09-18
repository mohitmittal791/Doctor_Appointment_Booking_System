
import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"



const changeAvailability=async(req, res)=>{
try {
    const {docId}=req.body
    const docData=await doctorModel.findById(docId)
    await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
    res.json({success:true, message:"Availability Changed"})
} catch (error) {
    console.log(error)
        res.json({success: false, message:error.message})
    
}
}
const doctorList=async(req, res) => {
    try {
        const doctors=await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true, doctors})
    } catch (error) {
        console.log(error)
        res.json({success: false, message:error.message})
        
    }
}

//api for docctor login
const loginDoctor=async(req,res)=>{
    try {
        const {email,password}=req.body
        const doctor =await doctorModel.findOne({email})
        if(!doctor){
            return res.json({success:false, message:'Invalid credentials'})
        }
        const isMatch=await bcrypt.compare(password,doctor.password)
        if(isMatch){
            const token=jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false, message:'Invalid credentials'})

        }

    } catch (error) {
        console.log(error)
        res.json({success: false, message:error.message})
        
    }
}

//api to get doctor appointments for doctor panel
const appointmentsDoctor=async(req,res)=>{
    try {
        const docId=req.docId
        const appointments=await appointmentModel.find({docId})
        res.json({success:true,appointments})

    } catch (error) {
        console.log(error)
        res.json({success: false, message:error.message})

    }
}
  
const updatePayment=async(req,res)=>{
    try {
        const {appointmentId, payment}=req.body
        await appointmentModel.findByIdAndUpdate(appointmentId,{payment})
        res.json({success:true,message:'Payment status updated'})
    } catch (error) {
        console.log(error)
        res.json({success: false, message:error.message})

    }
}

const cancelAppointmentDoctor=async(req,res)=>{
    try {
        const {appointmentId}=req.body
        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
        res.json({success:true,message:'Appointment Cancelled'})
    } catch (error) {
        console.log(error)
        res.json({success: false, message:error.message})

    }
}

const markAppointmentCompleted=async(req,res)=>{
    try {
        const {appointmentId}=req.body
        await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
        res.json({success:true,message:'Appointment Marked as Completed'})
    } catch (error) {
        console.log(error)
        res.json({success: false, message:error.message})

    }
}

const doctorDashboard=async(req,res)=>{
    try {
        const docId=req.docId
        const earnings = await appointmentModel.aggregate([
            { $match: { docId: docId, cancelled: false } },
            { $group: { _id: null, totalEarnings: { $sum: "$amount" } } }
        ])
        const appointmentsCount = await appointmentModel.countDocuments({ docId: docId })
        const patientsCount = await appointmentModel.distinct("userId", { docId: docId }).then(arr => arr.length)
        const latestAppointments = await appointmentModel.find({docId}).sort({date: -1}).limit(5).populate('userData').populate('docData')

        res.json({
            success: true,
            dashData: {
                earnings: earnings.length > 0 ? earnings[0].totalEarnings : 0,
                appointments: appointmentsCount,
                patients: patientsCount,
                latestAppointments
            }
        })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api to get doctor profile for doctor panel
const docctorProfile=async(req,res)=>{
    try {
        const docId = req.docId
        const profileData=await doctorModel.findById(docId).select('-password')
        res.json({success:true, doctor: profileData})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}

//api to update doctor profile data from doctor panel
const updateDoctorProfile=async(req,res)=>{
    try {
        const {docId, fees, address, available}=req.body
        await doctorModel.findByIdAndUpdate(docId, {fees, address, available})
        res.json({success:true, message:'Profile Updates'})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
   
    }
}

export {changeAvailability, doctorList,loginDoctor,appointmentsDoctor,updatePayment,cancelAppointmentDoctor,markAppointmentCompleted, doctorDashboard, docctorProfile, updateDoctorProfile}
