import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String},
    username: { type: String, required: true },
    address: {type: String, default:""},
    topic: {type: String, default:""},
    profilepic: {type: String,default:""},
    profilepic_id :{type: String,default:""},
    coverpic: {type: String,default:""},
    coverpic_id: {type: String,default:""},
    razorpayid: { type: String,default:"" },
    razorpaysecret: { type: String,default:"" },
    creator: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    });

 
export default mongoose.models.User || model("User", UserSchema);;