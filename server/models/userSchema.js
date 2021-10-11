import mongoose from "mongoose";

var goods = mongoose.Schema({
  itemName: String,
  itemThickness: Number,
  itemSize: Number,
});

const companies = mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  goods: [goods],
  address: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  gstNo: {
    type: String,
    // required: true,
  },
});

const schema = mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  //   auth id is _id
  _id: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  gstNo: {
    type: String,
    required: true,
  },
  companies: [companies],
});

const userSchema = mongoose.model("users", schema);
export default userSchema;
