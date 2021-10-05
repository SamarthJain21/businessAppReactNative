import express from 'express'
import userSchema from '../models/userSchema.js';

const router = express.Router();

router.post('/signup', async(req,res)=>{
    const {companyName, email} = req.body
    try{
        const newUser = await userSchema.create({companyName, email})
        res.status(200).json({result:newUser})
    }
    catch (error){
        res.status(500).json({result:"Something went wrong"})   
     }
})
export default router;