import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    userId: {type:String, requires:true},
    docId:{type:String, requires:true},
    slotDate:{type:String, requires:true},
    slotTime:{type:String, requires:true},
    userData:{type:Object, requires:true},
    docData:{type:Object, requires:true},
    amount:{type:Number, requires:true},
    date: {type:Number, requires:true},
    cancelled:{type:Boolean, default:false},
    payment:{type:Boolean, default:false},
    isCompleted:{type:Boolean, default:false}
})

const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema)
export default appointmentModel