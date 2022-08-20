import mongoose from "mongoose";
const FollowsSchema = mongoose.Schema({
  user_id: String,
  list_of_follows: [String],
});

const Follows = mongoose.model("Follows", FollowsSchema);
export default Follows;
