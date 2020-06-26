import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  username: string;
  salt: string;
  token: string;
  hash: string;
  friends: string[];
  age: number;
  race: string;
  family: string;
  food: string;
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, index: true },
  salt: { type: String, required: true, unique: true, index: true },
  hash: { type: String, required: true, unique: true, index: true },
  token: { type: String, required: true, unique: true, index: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  age: Number,
  race: String,
  family: String,
  food: String,
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
