import express from 'express'
import userSchema from '../models/userSchema.js';

const router = express.Router();

router.post('/signup', async(req,res)=>{
    const {companyName, email, authID, phoneNumber, address, country, state, city , pincode, gstNo} = req.body
    try{
        const newUser = await userSchema.create({companyName, email, authID, phoneNumber, address, country, state, city , pincode, gstNo})
        res.status(200).json({result:newUser})
    }
    catch (error){
        // console.log("errororrr")
        res.status(500).json({result:"Something went wrong"})   
     }
})

export default router;