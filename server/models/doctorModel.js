import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: { type: String },
    firstName: { type: String, required: [true, "First Name is required !!"] },
    lastName: { type: String, required: [true, "Last Name is required !!"] },
    phone: { type: String, required: [true, "Contact No is Required !!"] },
    email: { type: String, required: [true, "Email is Required !!"] },
    website: { type: String },
    address: { type: String, required: [true, "Address is required !!"] },
    specialization: {
      type: String,
      required: [true, "Specialization is required !!"],
    },
    degree: { type: String, required: [true, "Degree is required !!"] },
    experience: { type: Number, default: 0 },
    fees: { type: Number, required: [true, "Fees is required !!"] },
    timing: { type: Object, required: [true, "Work Timing is required !!"] },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("doctors", doctorSchema);

export default Doctor;
