import mongoose from 'mongoose'

const schema = mongoose.Schema({
    companyName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    authID:{
         type:String,
        required:true
    },
    phoneNumber:{
         type:String,
        required:true
    },
    address:{
         type:String,
        required:true
    },
    country:{
         type:String,
        required:true
    },
    state:{
         type:String,
        required:true
    },
    city:{
         type:String,
        required:true
    },
    pincode:{
         type:Number,
        required:true
    },
    gstNo:{
         type:String,
        required:true
    }

});

const userSchema = mongoose.model('users', schema);
export default userSchema;