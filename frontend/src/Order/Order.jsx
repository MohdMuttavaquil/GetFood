import { React, useContext, useState } from 'react'
import { AppContext } from '../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { showSuccessToast, showErrorToast } from '../utilis/Toast'
import Login from '../login/Login'

const Order = () => {

    const { url, total, token, cartItem, setTotal } = useContext(AppContext)
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        zipcode: "",
        phoneNo: "",
    })

    const navagite = useNavigate()

    const changeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value

        setData(data => ({ ...data, [name]: value }))
    }
    const items = cartItem.map((item) => item.name)

    const payment = async () => {
        setTotal(0)

        const res = await axios.post(`${url}/api/order/payment`, { amount: total + 40 })
        const order = res.data

        const option = {
            key: 'rzp_test_QXiPiAaXY4WeKN',
            amount: order.amount,
            currency: order.currency,
            name: 'foodlivery',
            description: 'Test Transaction',
            order_id: order.id,
            handler: async function (response) {
                const verifyRes = await axios.post(`${url}/api/order/varify`, {
                    order_id: response.razorpay_order_id,
                    payment_id: response.razorpay_payment_id,
                    signature: response.razorpay_signature,
                    amount: total + 40, data, items
                }, { headers: { token } })
                if (verifyRes.data.status === 'success') {
                    navagite("/")
                    showSuccessToast('Thanks for order')
                } else {
                    navagite("/")
                    showErrorToast('Please try again')
                }
            },

            prefill: {
                name: 'muttavaquil',
                email: "mmuttesdvd0@gmail.com",
                contact: '53536356462'
            },

            theme: { color: '#3300cc' }

        }

        const rzp = new window.Razorpay(option)
        rzp.open()

    }

    const cashOnDelivery = async (e) => {
        e.preventDefault()
        const res = await axios.post(`${url}/api/order/cash`, { amount: total + 40, data, items }, { headers: { token } })
        navagite("/")
        showSuccessToast('Thanks for order')
    }

    return (
        <>
            {token === "" ? <div className='min-h-screen mx-auto my-8 font-great text-xl'>Please login for order
                <Login />
            </div> :
                <div className='min-h-screen w-[80%] mx-auto flex pt-10 flex-col md:flex-row'>

                    <form onSubmit={cashOnDelivery} className='md:mx-20 flex flex-col md:w-[40%] gap-2'>
                        <div className='text-2xl font-semibold text-[#262626] mb-6'>Order information </div>

                        <div className='flex gap-2'>
                            <input onChange={changeHandler} value={data.firstName} name="firstName" className='outline-none border-2 border-[#ccc] rounded w-[50%]' type="text" placeholder='First Name' required />
                            <input onChange={changeHandler} value={data.lastName} name="lastName" className='outline-none border-2 border-[#ccc] rounded w-[50%]' type="text" placeholder='Last Name' required />
                        </div>

                        <input onChange={changeHandler} value={data.email} name="email" className='outline-none border-2 border-[#ccc] rounded' type="text" placeholder='Email' required />
                        <textarea onChange={changeHandler} value={data.street} name="street" rows={2} className='outline-none border-2 border-[#ccc] rounded' type="text" placeholder='Street' required />

                        <div className='flex gap-2'>
                            <input onChange={changeHandler} value={data.city} name="city" className='outline-none border-2 border-[#ccc] rounded w-[50%]' type="text" placeholder='City' required />
                            <input onChange={changeHandler} value={data.zipcode} name="zipcode" className='outline-none border-2 border-[#ccc] rounded w-[50%]' type="text" placeholder='Zipcode' required />
                        </div>

                        <input onChange={changeHandler} value={data.phoneNo} name="phoneNo" className='outline-none border-2 border-[#ccc] rounded' type="text" placeholder='phone No' required />
                        <input type='submit' value="CASH ON DELIVERY" className='py-1 px-4 rounded cursor-pointer text-white bg-[#A47148] font-semibold text-xl' />

                    </form>

                    <div className='text-xl mt-14 font-semibold flex flex-col gap-4 sm:w-[20rem] w-[96%] mx-auto'>

                        <div className='flex justify-between'>
                            <p>Prise </p>
                            <p>₹{total}</p>
                        </div>

                        <div className='flex justify-between'>
                            <p>Dlivery charge</p>
                            <p>₹{total === 0 ? 0 : 40}</p>
                        </div>

                        <div className='flex justify-between'>
                            <p>Total Amount</p>
                            <p>₹{total === 0 ? 0 : (total + 40)}</p>
                        </div>

                        <div>
                            <button onClick={payment} className='py-1 px-4 rounded text-white bg-[#A47148] font-semibold text-xl' >PAY NOW</button>
                        </div>

                    </div>

                </div>}

        </>
    )
}

export default Order
