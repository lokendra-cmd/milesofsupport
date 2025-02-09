"use client"
import React, { useState, useEffect, use } from 'react'
import coverPhoto from '../Images/coverPhoto.jpg'
import Script from 'next/script';
import profilePhoto from '../Images/profilePhoto.jpg'
import Image from 'next/image'
import { SiRazorpay } from "react-icons/si";
import { RxAvatar } from "react-icons/rx";
import { useSession } from 'next-auth/react'
import { fetchPayments, initiatePayment, fetchUser } from '@/app/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useParams,useSearchParams } from 'next/navigation'
import { setSelectedUser } from '@/app/StateManagment/Slices/selectedUserSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const dashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { username } = useParams();
  const searchparam = useSearchParams();
  const selectedUser = useSelector((state) => state.selectedUser)
  const { data: session } = useSession()

  const [paymentForm, setpaymentForm] = useState({ name: "", message: "", amount: "" })
  const [payments, setpayments] = useState([])
  const [triggerUseEffect, settriggerUseEffect] = useState(false)
  const paymentStatus = searchparam.get('payment');

  const handlechange = (e) => {
    setpaymentForm({ ...paymentForm, [e.target.name]: e.target.value })
  }

  const pay = async () => {
    let x = await initiatePayment(paymentForm.amount, paymentForm, selectedUser.email, selectedUser.username)
    let options = {
      "key_id": "rzp_test_wKr63hDBvhOQck", // Enter the Key ID generated from the Dashboard
      "amount": `"${paymentForm.amount * 100}"`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Miles of Support",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": x.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": "http://localhost:3000/api/razorpay",
      "prefill": {
        "name": `${paymentForm.name}`,
        "email": `${session.user.email}`,
        "contact": ""
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };
    console.log(options)
    var rzp1 = new Razorpay(options);
    rzp1.open();


    setpaymentForm({ name: "", message: "", amount: "" })
    settriggerUseEffect(!triggerUseEffect);
    
  }

  const getPayments = async (email) => {
    let payments = await fetchPayments(email);
    console.log(payments)
    setpayments(payments);
  }

  const setUser = async (username) => {
    try {
      const data = await fetchUser(username);
      if (data !== null) {
        const user = {
          name: data.name,
          email: data.email,
          topic: data.topic,
          username: data.username,
        };
        dispatch(setSelectedUser(user));

      } else {
        router.push('/404') // Redirect to the 404 page
      }
    } catch (error) {
      router.push('/404') // Redirect to 404 on fetch error
    }
  };

  useEffect(() => {
    setUser(username);
    getPayments(selectedUser.email);
  }, [username, selectedUser.email, triggerUseEffect])

  useEffect(() => {
   if(paymentStatus=="successful"){
    toast.success("Payment Done Successfuly")
    const cleanUrl = window.location.href.replace(/[?&]payment=successful(&|$)/, '').replace(/\?$/, '');
    router.replace(cleanUrl);
   }
  }, [])
  

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className=' flex justify-center items-center'>
        <div className="relative w-[80vw] h-[30vh] overflow-hidden ">
          <Image src={coverPhoto} alt="Description of image" layout="fill" objectFit="cover" objectPosition="center" className="transition-all" />
        </div>
      </div>

      <div className=' flex justify-center items-center h-[15vh]'>
        <div className="relative top-[-5vh] w-[12vw] h-[12vw] rounded-full overflow-hidden ">
          <Image src={profilePhoto} alt="Description of image" layout="fill" objectFit="cover" objectPosition="center" />
        </div>
      </div>

      <div className=' flex justify-center items-center'>
        <div className="profileDescription">
          <div className='username text-[2vw] text-white font-bold text-center'>{selectedUser.name}</div>
          <div className='topic text-[1vw] text-slate-200 font-semibold text-center'>{selectedUser.topic}</div>
          <div className='statstic text-[1vw] text-slate-200 font-normal text-center'>{payments.length} Supporter &#x2022; 0 Posts</div>
        </div>
      </div>

      <div className="flex gap-[2vw]  justify-center items-center">
        <div className=' flex justify-center items-center mb-[15vh] mt-[5vh] '>
          <div className="payment  bg-white bg-opacity-10 w-[46vw] h-[43vh] p-[1vw] rounded-lg overflow-y-scroll">
            <div className='text-center font-bold text-[1vw] text-white'>Supporters</div>

            <ul className='text-white mt-[2vw] ml-[2vw]'>
              {payments.map((element) => (
                <li key={element._id} className="flex items-center gap-[1vw] my-[2vh]">
                  <RxAvatar />
                  <span className="mr-2">{element.name} supported by {element.amount}₹ with message "{element.message}"</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className=' flex justify-center items-center mb-[15vh] mt-[5vh]'>
          <div className="payment  bg-white bg-opacity-10 w-[46vw] h-[43vh] p-[1vw] rounded-lg">
            <div className='text-center font-bold text-[1vw] text-white'>{selectedUser.name}</div>
            <input onChange={handlechange} className='bg-white bg-opacity-0 text-white w-[100%] p-[1vh] border border-white rounded-md my-[2vh]' name="name" value={paymentForm.name} autoComplete="off" placeholder='Name' type='text' />
            <input onChange={handlechange} className='bg-white bg-opacity-0 text-white w-[100%] p-[1vh] border border-white rounded-md my-[2vh]' name="message" value={paymentForm.message} autoComplete="off" placeholder='Message' type='email' />
            {/* <input className='bg-white bg-opacity-0 text-white w-[100%] p-[1vh] border border-white rounded-md my-[2vh]' placeholder='Address' type='text' /> */}

            <div className="relative w-[15vw] text-white my-[2vh]">
              <input onChange={handlechange} type="number" id="amount" className="bg-white bg-opacity-0 border p-[1vh] w-[100%] border-white rounded-md my-[2vh]" name="amount" autoComplete="off" value={paymentForm.amount} placeholder="Amount" />
              <label htmlFor="amount" className="absolute right-[2vh] top-[0.7vh] text-white text-[1.5vw] peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-sm peer-focus:text-blue-500 transition-all" >
                &#8377;
              </label>
            </div>

            <div onClick={pay} className='flex justify-center items-center'>
              <div type="button" className="flex items-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >
                <span className="mr-2">Make Payment</span>
                <SiRazorpay />
              </div>
            </div>

          </div>
        </div>
      </div>



    </>


  )
}

export default dashboard