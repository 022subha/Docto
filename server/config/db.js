import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://subhajit:subhajit@docto-db.29wunss.mongodb.net/docto`
    );
    console.log("Database connected Successfully!!");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
