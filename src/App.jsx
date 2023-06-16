import React from 'react'
import "./App.css"
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomeScreen from './Screens/HomeScreen'
import ProductScreen from './Screens/ProductScreen/ProductScreen'

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
        </Routes>
      </div>
    </main>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App