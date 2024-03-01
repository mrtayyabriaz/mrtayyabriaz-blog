import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/header'
// import { Footer } from './components'

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  )
}

export default Layout