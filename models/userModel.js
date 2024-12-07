import mongoose from "mongoose";

// Mongoose Schema and Model for User
const userSchema = new mongoose.Schema({
    username: { type: String, require: true },
    email: { type: String, require: true, unique: true  },
    password: { type: String, require: true },
})
userSchema.index({email:1}) // index will use to search the data fast
const User = mongoose.model('User', userSchema, "users");

export default User