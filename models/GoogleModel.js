import { Schema, model } from "mongoose";

const GoogleSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  googleId: {
    type: String
  }
});

const GoogleModel = model("google-ecommerce-auth", GoogleSchema);
export default GoogleModel;
