import React from 'react'
import { useState, useContext } from 'react'
import { photos } from '../assets/photo'
import { AppContext } from '../context/StoreContext'
import { showSuccessToast } from '../utilis/Toast'
import axios from 'axios'

const Login = ({ setlogin }) => {

  const [newuser, setnewuser] = useState(false)
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const { setToken } = useContext(AppContext)


  const onChangehandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(prevdata => ({ ...prevdata, [name]: value }))
  }

  const onLogin = async (e) => {
    e.preventDefault();
    let url = '/api/user'
    if (newuser) {
      url += '/ragister'
    } else {
      url += '/login'
    }

    const res = await axios.post(url, data)
    if (res.data.success) {
      const newToken = res.data.token
      setToken(newToken)
      localStorage.setItem('token', newToken)
      setlogin(false)
      showSuccessToast('Login successfully')
    }

    if (!res.data.success) {
      alert(res.data.message)
    }

  }

  return (
    <div className='absolute text-black inset-0 min-h-[100vh] z-50 bg-black bg-opacity-50 flex items-center justify-center'>


      <form onSubmit={onLogin} className='flex flex-col bg-white px-4 py-4 rounded md:w-[22rem]'>

        <div className="flex justify-between py-4">
          {newuser ? <p className='text-xl'>Singin</p> : <p className='text-xl'>login</p>}
          <img src={photos.cross} className='w-[1rem] h-[1rem]' onClick={() => setlogin(false)}></img >
        </div>

        <div className='flex flex-col gap-4 '>
          {newuser ? <input onChange={onChangehandler} value={data.name} name='name' className='outline-none border-2 border-[#ccc] rounded' type='text' placeholder='Name' required /> : <></>}

          <input onChange={onChangehandler} value={data.email} name='email' className='outline-none border-2 border-[#ccc] rounded' type='text' placeholder='Email' required />
          <input onChange={onChangehandler} value={data.password} name="password" className='outline-none border-2 border-[#ccc] rounded' type='password' placeholder='Password' required />
          
          {newuser ? <label><input className='outline-none border-2 border-[#ccc] rounded' type="checkbox" required />I agree to GetFood Terms of Service, Privacy Policy</label> : <></>}
          {newuser ? <button type='submit' className='py-2 bg-[#A47148] text-white rounded '>Create Account</button> : <button type='submit' className='py-2 bg-[#A47148] text-white rounded '>Login</button>}
          {newuser ? <p>Already have an account? <span className='text-red-600 cursor-pointer' onClick={() => setnewuser(false)}>Login</span></p> : <p>New to GetFood? <span className='text-red-600 cursor-pointer' onClick={() => setnewuser(true)}>Create Account</span> </p>}

        </div>

      </form>
    </div>
  )
}

export default Login
