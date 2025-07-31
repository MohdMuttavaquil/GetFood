import { React, createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [cartItem, setCartItem] = useState([])
  const [total, setTotal] = useState(0)
  const [token, setToken] = useState("")
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    const newToken = localStorage.getItem("token")

    if (newToken) {
      setToken(newToken)
    }
  }, [])

  const getCartData = async () => {

    const res = await axios.get("/api/cart/data", { headers: { token } })
    let userCart = res.data.cartData
    setCartData(userCart)
    const newCertItem = []

    const itemid2 = Object.keys(userCart).filter((id) => userCart[id] > 0).map((id) => parseInt(id))
    for (let id of itemid2) {
      const responce = await axios.get(`/api/food/item/${id}`)
      let data = responce.data
      newCertItem.push(data)
    }

    setCartItem(newCertItem)

  }


  return (
    <AppContext.Provider value={{ cartData, setCartData, getCartData, token, setToken, id, setId, setCartItem, name, setName, price, setPrice, desc, setDesc, image, setImage, total, setTotal, cartItem }}>
      {children}
    </AppContext.Provider>
  );
};