const mongoose = require("mongoose")
//Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://risingsmruti:A3HHPider2KKJpLl@cluster0.mongodb.net/signupapi?retryWrites=true&w=majority"
    );
    console.log(`MongoDB Connected: {conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
module.exports = connectDB;