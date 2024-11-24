import React from 'react'
import ProductTab from '../components/productTab'
import '../styles/product.css'

const product = () => {
  return (
    <div className='productMain'>
        <h1>Product Page</h1>
        <ProductTab />
    </div>
  )
}

export default product