import "./App.css"
import Navber from './components/Navber'
import Footer from './components/Footer'
import Home from './Home/Home'
import { Route, Routes } from 'react-router-dom'
import { useState } from "react"
import Detail from './Home/Detail'
import Login from "./login/Login"
import Cart from "./Order/Cart"
import Order from "./Order/Order"
import UserOrder from "./Order/UserOrder"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from "./utilis/scrolltotop"

function App() {

  const [login, setlogin] = useState(false)

  return (
    <>
   
   {login? <Login setlogin={setlogin} />: <></>}
    

    <Navber setlogin={setlogin} login={login} />
    <ScrollToTop />
    <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path='/Detail' element={<Detail />}></Route>
    <Route path="/Cart" element={<Cart />}></Route>
    <Route path="/Order" element={<Order />}></Route>
    <Route path="/UserOrder" element={<UserOrder />}></Route> 
    </Routes>
     <Footer />
     <ToastContainer />
    </>
  )
}

export default App
