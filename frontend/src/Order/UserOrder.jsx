import { React, useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/StoreContext'
import axios from 'axios'
import { photos } from '../assets/photo'


const Userorder = () => {

  const { token } = useContext(AppContext)
  const [data, setData] = useState([])


  const getdata = async () => {
    const res = await axios.post('/api/order/userorder', {}, { headers: { token } })
    setData(res.data.userOrder)
  }

  useEffect(() => {
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
                  return <p className='font-great font-bold-[400]' key={index}>{(index + 1) + " " + i}</p>
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

      </div> :
        <div className='md:w-[70%] mx-auto my-8 font-great font-semibold text-xl'>Please login for orders details</div>}

    </div>
  )
}

export default Userorder
