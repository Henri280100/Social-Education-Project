const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const GENDERS = ['M', 'F', 'O']

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: "This field cannot be empty.",
  },
  email: {
    type: String,
    required: "Email can't be empty.",
    unique: true,
  },
  passwords: {
    type: String,
    required: "Passwords can't be empty.",
    minLength: [8, "Password must be at least 8 characters long."],
  },
  repeatPwd:{
    type: String,
    required: "Passwords can't be empty.",
    minLength: [8, "Password must be at least 8 characters long."]
  },
  isVerified: { type: Boolean, default: false },
  age:{
    type: Number,
    required: "Age can't be empty.",
    min: [15, "You must be at least 18 years old."],
  },
  gender:{
    type: String,
    require: "Gender can't be empty.",
    enum: GENDERS 
  },
  
});
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password);
};
userSchema.path("email").validate((val) => {
  emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Invalid Email");

module.exports = mongoose.model("User", userSchema);

