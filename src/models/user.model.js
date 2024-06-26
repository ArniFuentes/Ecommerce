import mongoose from "mongoose";

const userCollection = "user";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  age: Number,
  password: String,
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "cart" },
  role: {
    type: String,
    enum: ["user", "admin", "premium"], // Roles
    default: "user",
  },
  githubId: Number,
  documents: [
    {
      name: String,
      reference: String,
    },
  ],
  last_connection: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model(userCollection, userSchema);

export default User;
