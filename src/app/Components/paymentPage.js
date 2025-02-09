"use client"
import React from 'react'

const paymentPage = () => {
    
    

    var rzp1 = new Razorpay(options);
    return (
        <div>
            <button onClick={(e)=>{{rzp1.open()}}} id="rzp-button1">Pay</button>
        </div>
    )
}

export default paymentPage