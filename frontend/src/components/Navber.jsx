import React from 'react'
import { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { photos } from '../assets/photo';
import { AppContext } from '../context/StoreContext';
import '../App.css'
import { useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, setToken, getCartData, login, setLogin } = useContext(AppContext)
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    login ? document.body.style.overflow = "hidden" :  document.body.style.overflow = "auto"
  }, [login])

  const showLogout = () => {
    setShow(!show)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken("")
    navigate('/')
  }

  const userCart = async ()=>{
    if (token !== "") {
     await getCartData() 
    }
  }

  return (
    <nav className="px-4 py-4">

      <div className="container flex items-center justify-between">

        <Link to="/"> <div className="text-2xl font-bold text-[#F4A261] font-great sm:ml-32">GetFood</div></Link>

        <div className="flex ">
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/" className="hover:text-cyan-400 transition">Home</Link>
            <a href="#menu" className="hover:text-cyan-400 transition">Menu</a>
            <Link to="/userorder" className="hover:text-cyan-400 transition">Your Order</Link>

            <div className='relative'>
              <Link to="/Cart">
                <img src={photos.backet} onClick={()=>userCart()} className='h-[1.5rem] w-[1.5rem]' />
              </Link>
            </div>

          </div>

          <div className='flex items-center'>
            <div className='relative flex md:hidden'>
              <Link to="/Cart">
                <img src={photos.backet} onClick={()=>userCart()} className='h-[1.5rem] w-[1.5rem]' />
              </Link>
            </div>

            {token === "" ? <button onClick={() => setLogin(true)} className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 sm:mr-24 rounded ml-10">
              Sign In
            </button> :
              <div className='flex flex-col gap-2'>
                <img src={photos.profile} onClick={() => showLogout()} className='h-[1.5rem] w-[1.5rem] sm:mr-24 rounded ml-10 ' /> 

                <div onClick={() => logout()} className={show ? ' hover:text-red-600 flex my-2 items-center sm:mr-24 ml-4 gap-2' : 'hidden'}>
                  <p className=' '>Logout</p>
                  <img src={photos.logout} className='h-[1.25rem] w-[1.25rem] rounded ' />

                </div>
              </div>}


          </div>

        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-0.5 bg-black" />
          <span className="w-6 h-0.5 bg-black" />
          <span className="w-6 h-0.5 bg-black" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-6 flex flex-col gap-3 px-4 ">
          <Link to="/" className="hover:text-cyan-400 transition">Home</Link>
          <a href="#menu" className="hover:text-cyan-400 transition">Menu</a>
          <Link to="/userorder" className="hover:text-cyan-400 transition">Your Order</Link>
         
        </div>
      )}
    </nav>
  );
};

export default Navbar;
