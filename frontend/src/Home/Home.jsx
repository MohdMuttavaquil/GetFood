import { React } from 'react'
import { photos, menu_list } from '../assets/photo'
import Card from '../components/Card'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Home = () => {

  useEffect(()=>{
  axios.get("/api/food/itemlist")
  .then((res =>{setmenu_item(res.data)}))
  },[])

  const [category, setcategory] = useState("All");
  const [menu_items, setmenu_item] = useState([])

  return (
    <div>

      <div >
        <img src={photos.burgerfrise} className="my-2 sm:w-[80%] w-[95%] mx-auto sm:h-[70vh] h-[60vh] rounded-xl"></img>
      </div>

      <div>
        <div className="sm:text-[1.75rem] text-xl mt-10 w-[90%] mx-auto font-great font-semibold" id='menu'>Explore Our Menu</div>

        <div className="menu-items text-center font-semibold font-great my-6 flex w-[80%] mx-auto h-52 overflow-x-scroll ">
          {menu_list.map((item, index) => {
            return (<div onClick={() => setcategory(prev => prev === item.name ? "All" : item.name)} key={index} className='h-44 min-w-40 mx-4'>
              <img src={item.image} className='h-40 w-full rounded-full object-cover menu-image '></img>
              <p className='py-2'>{item.name}</p>
            </div>)
          })}

        </div>

      </div>

      <div className='sm:w-[80%] mx-auto flex flex-wrap gap-5 justify-evenly'>
        {menu_items.map((item, index) => {
          if (category==="All" || category === item.category) {
            return( 
            <Card key={index} itemId={item.id} itemImage={item.image} itemName={item.name} itemPrice={item.price} itemDesc={item.desc} />)
          }
        })}

      </div>

    </div>
  )
}

export default Home
