import { React, useContext, useEffect } from 'react'
import { AppContext } from '../context/StoreContext'
import { Link } from 'react-router-dom'
import { photos } from '../assets/photo';
import axios from 'axios';
import { showRemoveToast } from '../utilis/Toast';

const Cart = () => {

    const { cartItem, token, getCartData, total, setTotal, setCartItem } = useContext(AppContext);

    const removetocart = async (id, itemprice) => {
        if (token === "") {
            setCartItem((prevItems) => prevItems.filter((item) => item.id !== id))
            setTotal((prev) => prev - itemprice)
            showRemoveToast('Item removed successfully!')
        }
        else {
            const res = await axios.post("/api/cart/remove", { id }, { headers: { token } })
            setTotal((prev) => prev - itemprice)
            getCartData()
            showRemoveToast('Item removed successfully!')
        }

    }

    useEffect(() => {
        const sum = cartItem.reduce((acc, item) => acc + item.price, 0);
        setTotal(sum);
    }, [cartItem]);

    return (
        <div className='md:w-[80%] px-2 mx-auto text-[#262626] min-h-screen'>
            <div className='text-2xl font-semibold '>Food Cart</div>
            <hr className='border-2 '></hr>

            {cartItem.map((item) => {
                return (<div key={item.id} className='flex h-[20vh] justify-between my-6'>
                    <img src={item.image} className='h-full w-[10rem] rounded object-cover'></img>
                    <p className='text-xl mx-1 w-[25%]'>{item.name} </p>
                    <p className='text-xl font-semibold w-[25%]'>₹{item.price}</p>
                    <img src={photos.remove} onClick={() => removetocart(item.id, item.price)} className='h-[1.5rem] w-[1.5rem] cursor-pointer' />
                </div>)
            })}


            <div className='font-semibold flex justify-end text-xl '>Subtotal ₹{total} </div>
            <div className='flex justify-end my-2'>
                <Link to="/order"><button className='py-1 px-4 rounded text-white bg-[#A47148] font-semibold text-xl'>PROSSED TO CHECKOUT</button> </Link>
            </div>

        </div>
    )
}

export default Cart
