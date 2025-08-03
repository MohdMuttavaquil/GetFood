import { React, useContext } from 'react'
import { AppContext } from '../context/StoreContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Card = ({ itemId, itemImage, itemName, itemPrice, itemDesc }) => {

  const { url, setName, setPrice, setDesc, setImage, setId } = useContext(AppContext);
  const navigate = useNavigate()

  const print = async () => {
    const res = await axios.get(`${url}/api/food/item/${itemId}`)
    const data = res.data
    setName(data.name)
    setDesc(data.desc)
    setImage(data.image)
    setPrice(data.price)
    setId(data.id)
    navigate(`/Detail`)
  }

  return (

    <>
      <div onClick={() => print()} className='h-[35vh] md:h-[45vh]  md:w-[22%] w-[45%] mt-4 card'>
        <img src={itemImage} className='w-full md:h-[60%] h-[70%] object-cover rounded-t-lg rounded-b-sm'></img>
        <p className="text-lg font-great">{itemName}</p>
        <p className="text-xl">₹{itemPrice}</p>
        <p className="font-sans text-sm md:flex hidden">{itemDesc}</p>
      </div>

    </>
  )
}

export default Card
