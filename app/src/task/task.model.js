import mongoose from 'mongoose' ;


const taskSchema = new mongoose.Schema({
    adminId:{
        type: mongoose.Schema.Types.ObjectId ,
        ref:'user'
    } ,
    techId:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:'user'
    } ,
    customerdata:{
       location :{
           type:String 
            
        } ,
        customerName:{
            type:String 
        } ,
        customerPhonenumber:{
            type:String
        } 
    } ,
    report:{
        type:String
    },
   description:{
       type: String
   } ,
   confirmed:{
       type:Boolean ,
       default: false
   } ,
   date:{
       type: Date
   } ,
   duration:{
       type: String
   } ,
   category:{
       type:String
   }
        
}, {timestamps:true})



export const Task = mongoose.model('task' , taskSchema);