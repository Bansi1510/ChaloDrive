import mongoose from "mongoose";

const databaseUrl = process.env.MONGODB;

if (!databaseUrl) {
  throw new Error("Database Url Not Founded");
}

let catched = global.mongoDbConnection;

if (!catched) {
  catched = global.mongoDbConnection = { conn: null, promise: null };
}

const connectDB = async () => {
  if (catched.conn) {
    return catched.conn;
  }
  if (!catched.promise) {
    catched.promise = mongoose.connect(databaseUrl).then(c => c.connection);
  }

  try {
    const conn = await catched.promise;
    console.log("Database connected successfully")
    return conn;
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;