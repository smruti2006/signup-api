const mongoose = require("mongoose");

// Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://risingsmruti:A3HHPider2KKJpLl@cluster0.mongodb.net/signupapi?retryWrites=true&w=majority"
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Stop the app if DB fails to connect
  }
};

module.exports = connectDB;
