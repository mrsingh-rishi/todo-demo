const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/todo-test");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", userSchema);
// y | kuchor hoto bi chelaga  | actual model name is User not userSchema

module.exports = User;
