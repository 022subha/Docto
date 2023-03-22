import mongoose from "mongoose";

const connectDB = () => {
  // try {
  //   await mongoose.connect(process.env.MONGODB_URL);
  //   console.log("Database connected Successfully!!");
  // } catch (error) {
  //   console.log(error);
  // }
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Database connected successfully!!");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectDB;
