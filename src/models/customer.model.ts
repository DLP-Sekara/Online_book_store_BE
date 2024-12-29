import mongoose from "mongoose";
const customerSchema = new mongoose.Schema({
  cus_id: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: false,
  },
  mobile_number: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    required: true,
  },
});
const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
