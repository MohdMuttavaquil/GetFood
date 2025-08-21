import { React, useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/StoreContext'
import axios from 'axios'
import { photos } from '../assets/photo'


const UserOrder = () => {

  const { token, url } = useContext(AppContext)
  const [data, setData] = useState([])

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await axios.post(`${url}/api/order/userorder`, {}, { headers: { token } })
        setData(res.data.userOrder || data)
      } catch (error) {
        console.log(error)
      }
    }

    getdata()
  }, [])

  return (
    <div className='min-h-screen'>

      {token ? <div className='my-18'>
        {data.map((i, index) => {
          return <div className='md:w-[70%] mx-2 sm:mx-auto my-8' key={index}>
            <img src={photos.order} />
            <div className='flex justify-between items-center w-full'>

              <div className='sm:w-[30%] w-[50%]'>
                <p className='my-2 font-semibold font-great'>Items</p>
                {i.item.map((i, index) => {
                  return <p className='font-great font-bold-[400]' key={index}>{(index + 1) + ", " + i}</p>
                })}
              </div>

              <div className='w-[20%]'>
                <p className='my-2 font-semibold font-great'>Amount</p>
                <p className='font-great font-bold-[400] text-lg' >₹ {i.amount}</p>
              </div>

              <div className='hidden md:flex flex-col w-[30%]'>
                <p className='my-2 font-semibold font-great'>Order date</p>
                <p className='font-great font-bold-[400]'>{new Date(i.date).toLocaleString('en-GB', {
                  year: 'numeric', month: '2-digit', day: '2-digit',
                  hour: '2-digit', minute: '2-digit', hour12: true
                })}</p>
              </div>

              <button className='font-great font-semibold h-8 px-3 py-1 bg-[#34D399] hover:bg-[#059669]  text-white rounded '>Track Order</button>
            </div>
          </div>
        })}

      </div> : <div className='w-full text-center text-xl pt-20 font-semibold font-great'>You do not have any orders yet</div>}

    </div>
  )
}

export default UserOrder
