import Doctor from "../models/doctorModel.js";

export const addDoctor = async (req, res) => {
  const {
    firstName,
    lastName,
    address,
    degree,
    email,
    phone,
    experience,
    feesPerConsultation,
    timings,
    specialization,
    website,
  } = req.body;
  try {
    const doctor = await Doctor.findOne({ email });
    if (doctor) {
      return res.status(202).json({
        status: false,
        message: "Doctor with this Email already exists !!",
      });
    }

    let newDoctor = new Doctor({
      firstName,
      lastName,
      phone,
      email,
      website,
      address,
      specialization,
      degree,
      experience,
      fees: feesPerConsultation,
      timings,
    });
    await newDoctor.save();

    return res
      .status(200)
      .json({ status: true, message: "Doctor Added Successfully !!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error !!" });
  }
};

export const getDoctor = async (req, res) => {
  try {
    let doctors = await Doctor.find({});
    return res.status(200).json({ status: true, doctors });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Error !!" });
  }
};
