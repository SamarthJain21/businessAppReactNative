import mongoose from 'mongoose'

const schema = mongoose.Schema({
    companyName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    }
});

const userSchema = mongoose.model('users', schema);
export default userSchema;