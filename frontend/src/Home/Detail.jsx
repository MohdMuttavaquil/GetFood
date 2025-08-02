import { React, useContext } from 'react'
import { AppContext } from '../context/StoreContext'
import { photos } from '../assets/photo';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { showSuccessToast } from '../utilis/Toast';

const Detail = () => {

  const navgation = useNavigate()

  const { token, getCartData, id, setTotal, name, price, desc, image, cartItem, setCartItem } = useContext(AppContext);


  const addToCart = async () => {
    if (token === "") {
      let data = { name, price, image, id }
      setCartItem([...cartItem, data])
      setTotal((prev) => prev + price)
      navgation('/')
      showSuccessToast('Item add in cart')
    }

    else {
      const res = await axios.post("/api/cart/add", { id }, { headers: { token } })
      setTotal((prev) => prev + price)
      getCartData()
      navgation('/')
      showSuccessToast('Item add in cart')
    }

};

  const order = async (price) => {
      const res = await axios.post("/api/cart/add", { id }, { headers: { token } })
      setTotal(price)
      getCartData()
      navgation('/order')
  }

return (
  <div>

    <div className='flex flex-col md:flex-row sm:w-[80%]  mx-2 md:mx-auto gap-6 my-4'>
      <img src={image} className="card h-[70vh] sm:w-[40%] rounded-xl"></img>
      <div className="md:mt-6">
        <p className='md:text-3xl text-xl font-great'>{name}</p>
        <p className='md:text-xl md:w-[60%]' > {desc}</p>
        <img src={photos.star} className='h-[4rem] w-[6rem]'></img>
        <p className='text-3xl'>₹{price}</p>
        <br></br>

        <div className="flex flex-col gap-0.5">
          <button onClick={() => order(price)} className='text-2xl font-great w-[8rem] text-white bg-[#e74c3c] hover:bg-[#c0392b] py-1 px-4 rounded my-2'>Order</button>
          <button onClick={() => addToCart()} className=' w-[12rem] text-2xl font-great text-white bg-[#2A9D8F] py-1 px-4 rounded my-2'>Add To Order</button>
        </div>

      </div>
    </div>

  </div>
)
}

export default Detail
