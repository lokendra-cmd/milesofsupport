"use server"
import Razorpay from "razorpay"
import Payment from "@/app/Models/Payment"
import  User  from "@/app/Models/User"
import mongoose from "mongoose";
import connectDB from "@/app/DB/connectDB";

export const initiatePayment = async (amount, paymentForm,to_user_email,to_user_name) => {
    await connectDB();


    var instance = new Razorpay({ key_id:process.env.KEY_ID , key_secret: process.env.KEY_SECRET })


    let options = {
        amount: Number.parseInt(amount) * 100,  // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",

    }


    let x = await instance.orders.create(options)

    await Payment.create({
        name: paymentForm.name,
        oid: x.id,
        to_user_email: to_user_email,
        to_user_name:to_user_name,
        message: paymentForm.message,
        amount: amount
    });
    

    return x;
}

export const fetchUser= async(username)=>{
  await connectDB();

  const user = await User.findOne({ username:username }).lean();

  if (!user) return null;

  // Remove Mongoose-specific properties, including nested _id
  const cleanedUser = {
    ...user,
    _id: user._id.toString(), // Convert _id to string
  };

  return cleanedUser;
}

export const fetchPayments = async (email) => {
  await connectDB();

// fetch payments corrosponding user name in descending order by amount
let payments = await Payment.find({ to_user_email: email, done: true }).sort({ amount: -1 });

  // Convert each document to plain objects and serialize ObjectIds
  const serializedPayments = payments.map((payment) => {
    const plainPayment = payment.toObject();
    plainPayment._id = plainPayment._id.toString(); // Convert ObjectId to string
    plainPayment.createdAt = plainPayment.createdAt.toISOString(); // Ensure date compatibility
    plainPayment.updatedAt = plainPayment.updatedAt.toISOString();
    return plainPayment;
  });
  
  return serializedPayments;

};

export const updateProfile = async (data) => {
  await connectDB();
  let previousData = await User.findOne({email:data.email});

  if(previousData.username!==data.username){
    let check = await User.findOne({username:data.username});
    if(check){
      throw new Error("Username already exists"); 
    }
    else{
      await User.updateOne({email:data.email},data);
    }
  }
  else{
    await User.updateOne({email:data.email},data);
  }
  
    
}

export const getData = async (email) => {
  await connectDB();

  const user = await User.findOne({ email:email }).lean();

  if (!user) return null;

  // Remove Mongoose-specific properties, including nested _id
  const cleanedUser = {
    ...user,
    _id: user._id.toString(), // Convert _id to string
  };

  return cleanedUser;
};