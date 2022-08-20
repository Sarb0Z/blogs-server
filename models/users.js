import mongoose from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
});
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
const User = mongoose.model("User", UserSchema);
export default User;
