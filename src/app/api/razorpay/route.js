import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/app/Models/Payment";
import connectDB from "@/app/DB/connectDB";


export const POST = async (req) =>  {
    await connectDB();
    let body = await req.formData()
    body = Object.fromEntries(body)

    //check if the razorpay id is created on server
    let p = await Payment.findOne({oid:body.razorpay_order_id})

    if(!p){
        return NextResponse.json({"success":false,"message":"order id not found"})
    }
   

    //verify the payment
    let status = validatePaymentVerification({"order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id }, body.razorpay_signature, process.env.KEY_SECRET)
  

    //update payment status
    if(status){
        const UpdatedPayment = await Payment.findOneAndUpdate({oid:body.razorpay_order_id},{done:true},{new:true});
        return NextResponse.redirect(`http://localhost:3000/${p.to_user_name}?payment=successful`)
    }
    else{
        return NextResponse.json({"success":false, "message":"payment verification failed"})
    }
}
