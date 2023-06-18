import React from 'react'
import "./App.css"
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomeScreen from './Screens/HomeScreen'
import ProductScreen from './Screens/ProductScreen/ProductScreen'
import CartScreen from './Screens/CartScreen/CartScreen'
import ShippingScreen from './Screens/shippingScreen/ShippingScreen'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import ProfileScreen from './Screens/profileScreen/ProfileScreen'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <main>
      <div className='container'>
        <Routes>
          <Route path='/' element={<HomeScreen/>}/>
          <Route path='/product/:id' element={<ProductScreen/>}/>
          <Route path='/cart' element={<CartScreen/>}/>
          <Route path='/shipping' element={<ShippingScreen/>}/>

          {/* authentication routes */}
          <Route path='/signin' element={<LoginScreen/>}/>
          <Route path='/signup' element={<RegisterScreen/>}/>
          <Route path='/profile' element={<ProfileScreen/>}/>
          {/* authentication end */}
        </Routes>
      </div>
    </main>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App