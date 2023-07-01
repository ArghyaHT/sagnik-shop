import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomeScreen from './Screens/HomeScreen'
import ProductScreen from './Screens/ProductScreen/ProductScreen'
import CartScreen from './Screens/CartScreen/CartScreen'
import ShippingScreen from './Screens/shippingScreen/ShippingScreen'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import ProfileScreen from './Screens/profileScreen/ProfileScreen'
import Payment from './Screens/Payment/Payment'
import PlaceOrder from './Screens/Placeorder/PlaceOrder'
import OrderScreen from './Screens/OrderScreen/OrderScreen'
import Demo from './Screens/Demo'
import UserList from './Screens/admin/UserList/UserList'
import UserEdit from './Screens/admin/UserEdit/UserEdit'
import ProductList from './Screens/admin/ProductList/ProductList'
import ProductCreate from './Screens/admin/ProductCreate/ProductCreate'
import ProductEdit from './Screens/admin/ProductEdit/ProductEdit'
import OrderList from './Screens/admin/OrderList/OrderList'

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <div className='container'>
            <Routes>
              <Route path='/' element={<HomeScreen />} />
              <Route
                path='/search/:keyword'
                element={<HomeScreen />}
              />

              <Route
                path='/page/:pageNumber'
                element={<HomeScreen />}
              />
              {/* if we have search a particular product and that product is present more then we also
               want to apply pagination there also */}
              <Route
                path='/search/:keyword/page/:pageNumber'
                element={<HomeScreen />}
              />
              <Route path='/product/:id' element={<ProductScreen />} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/shipping' element={<ShippingScreen />} />

              {/* authentication routes */}
              <Route path='/signin' element={<LoginScreen />} />
              <Route path='/signup' element={<RegisterScreen />} />
              <Route path='/profile' element={<ProfileScreen />} />
              {/* authentication end */}

              <Route path='/payment' element={<Payment />} />
              <Route path='/placeorder' element={<PlaceOrder />} />
              <Route path='/order/:id' element={<OrderScreen />} />
              <Route path='/demo' element={<Demo />} />

              {/* admin-route starts */}
              <Route path='/admin/userlist' element={<UserList />} />
              <Route path='/admin/userlist/:id' element={<UserEdit />} />
              <Route path='/admin/productlist' element={<ProductList />} />
              <Route path='/admin/productlist/create' element={<ProductCreate />} />
              <Route path='/admin/productlist/:id/edit' element={<ProductEdit />} />
              <Route path='/admin/orderlist' element={<OrderList />} />
              {/* admin-route-ends */}
            </Routes>
          </div>

        </main>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App