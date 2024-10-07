import { model, Schema } from "mongoose";

const UserAuthCollection = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const UserAuth = model("userAuthCollection", UserAuthCollection);
export default UserAuth;
