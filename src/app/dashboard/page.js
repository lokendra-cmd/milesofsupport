"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import profilePhoto from '../Images/profilePhoto.jpg'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { getData, updateProfile } from '../actions/userAction'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserField, setUser } from '@/app/StateManagment/Slices/currentUserSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const page = () => {
  const { data: session } = useSession()
  const dispatch = useDispatch()

  const currentUser = useSelector((state) => state.currentUser)
  const [triggerEffect, setTriggerEffect] = useState(false);

  if (!session) {
    redirect('/login')
  }

  const handlechange = (e) => {
    const { name, value } = e.target;
    dispatch(updateUserField({ field: name, value }));
  }

  const handleUpdate = async () => {
    try {
      let data = {
        name: currentUser.name,
        address: currentUser.address,
        email: currentUser.email,
        topic: currentUser.topic,
        username: currentUser.username,
      }
      dispatch(setUser(data));
      await updateProfile(data).then(toast.success("Profile updated successfully!"));
    } catch (error) {
      toast.error("Failed to update data!")
    }


  }
  useEffect(() => {
    // Fetch data and then dispatch the action to update the store

  }, [triggerEffect]);

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
      <div className="bg-white bg-opacity-5 mx-auto w-[70vw] p-[1vw] rounded-[1vw] mb-[15vh] mt-[5vh]">
        <div className='greetings text-white font-bold text-center font-sans text-[2vw] mb-[3vh]'>
          {`Welcome ${currentUser.name}`}
        </div>
        <div className="relative mx-auto w-[10vw] h-[10vw] rounded-full overflow-hidden ">
          <Image src={profilePhoto} alt="Description of image" layout="fill" objectFit="cover" objectPosition="center" />
        </div>


        <div className='grid grid-cols-[48%_48%] gap-[1vw] gap-y-[5vh] mt-[3vh]'>
          <div className="relative z-0">
            <input type="text" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" name='name' value={currentUser.name || ""} onChange={handlechange} placeholder="" />
            <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Name</label>
          </div>

          <div className="relative z-0">
            <input type="text" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" name='username' value={currentUser.username || ""} onChange={handlechange} placeholder="" />
            <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Username</label>
          </div>
          <div className="relative z-0">
            <input type="text" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" name='email' value={currentUser.email || ""} onChange={handlechange} disabled={true} placeholder=" " />
            <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email</label>
          </div>
          <div className="relative z-0">
            <input type="text" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" name='address' value={currentUser.address || ""} onChange={handlechange} placeholder=" " />
            <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Address</label>
          </div>
          <div className="relative z-0">
            <input type="text" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" name='topic' value={currentUser.topic || ""} onChange={handlechange} placeholder=" " />
            <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Topic</label>
          </div>

          <div>

          </div>


          <div className=''>
            <label className="block  mb-2 text-sm  text-gray-900 dark:text-gray-400" htmlFor="file_input">Profile Picture</label>
            <input className="block p-[1vh] w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
            <p className="  mt-1 text-[0.8rem] text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF.</p>
          </div>

          <div className=''>
            <label className="block  mb-2 text-sm  text-gray-900 dark:text-gray-400" htmlFor="file_input">Cover Photo</label>
            <input className="block p-[1vh] w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
            <p className="  mt-1 text-[0.8rem] text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF.</p>
          </div>

        </div>
        <div className="saveButton mt-[5vh] w-[8vw] mx-auto" onClick={handleUpdate}>
          <button type="button" className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save</button>
        </div>


      </div>
    </>
  );
}

export default page