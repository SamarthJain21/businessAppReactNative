import express from "express";
import userSchema from "../models/userSchema.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const {
    companyName,
    email,
    _id,
    phoneNumber,
    address,
    country,
    state,
    city,
    pincode,
    gstNo,
  } = req.body;
  try {
    console.log("inside user.js");
    console.log(phoneNumber);
    const newUser = await userSchema.create({
      companyName,
      email,
      _id,
      phoneNumber,
      address,
      country,
      state,
      city,
      pincode,
      gstNo,
    });
    res.status(200).json({ result: newUser });
    console.log(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    console.log(req.body);
    const { id: id } = req.params;

    // if (!mongoose.Types.ObjectId.isValid(id))
    // return res.status(404).send("User id not valid");
    // console.log("id is ", id);
    const userInfo = await userSchema.findById(id);
    console.log(userInfo);
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
});

export default router;
