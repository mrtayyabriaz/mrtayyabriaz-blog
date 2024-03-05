import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/header'
import { HeaderNew } from './components/HeaderNew'
// import { Footer } from './components'

const Layout = () => {
  return (
    <>
    <HeaderNew />
      {/* <Header /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  )
}

export default Layout