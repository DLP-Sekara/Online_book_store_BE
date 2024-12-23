import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin"], required: true },
  date_of_birth: { type: Date, required: true },
});

export default mongoose.model("Admin", adminSchema);
