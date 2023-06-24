import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import React from 'react'

const Demo = () => {
  return (
    <>
    <p>price $39.99</p>
    <PayPalScriptProvider>
    <PayPalButtons/>
    </PayPalScriptProvider>
    
    </>
  )
}

export default Demo