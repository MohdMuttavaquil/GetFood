import React from 'react'

const Footer = () => {
  return (
    <div className='footer bg-[#323232] text-white mt-[5rem]'>

<div className="sm:w-[80%] mx-auto sm:flex justify-evenly py-10">

      <div className="md:w-[40%]">
        <h1 className='text-2xl text-[#F4A261] my-2'>GetFood</h1>
        <p>GetFood is your go-to food delivery app, bringing meals from your favorite local restaurants straight to your doorstep. With an easy-to-use interface, quick delivery, and real-time tracking, GetFood makes satisfying your cravings simple, fast, and reliable—anytime, anywhere.</p>
      </div>

      <div className="md:w-[25%]">
        <h2 className='text-lg font-semibold my-2'>Compeny</h2>
        <ul>
          <li className='cursor-pointer my-1'>Home</li>
          <li className='cursor-pointer my-1'>About Us</li>
          <li className='cursor-pointer my-1'>Privacy Policy</li>
        </ul>
      </div>

      <div className="md:w-[25%]">
        <h2 className='text-lg font-semibold my-2'>Get in Touch</h2>
        <ul>
          <li className='cursor-pointer my-1'>+91 91234 56789 </li>
          <li className='cursor-pointer my-1'>getfood@gmail.com</li>
        </ul>
      </div>

      </div>

    </div>
  )
}

export default Footer
