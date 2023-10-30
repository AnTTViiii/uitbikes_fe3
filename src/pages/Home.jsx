import React, { useState } from 'react'
import Banner from '../components/Banner/Banner'
import TypeMenu from '../components/TypeMenu/TypeMenu'
import Product from '../components/Product/Product'

const Home = () => {
  const [type, getType] = useState(0);

  return (
    <div className='home'>
      <Banner />
      <TypeMenu getType={getType}/>
      <Product type={type}/>
    </div>
  )
}

export default Home
