import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../store/authslice'

const Home = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector(state => state.LoginStatus)
  return (
    <>
      <h1>
        {loginStatus ? 'Login Success' : 'Logged Out'}
        <button className='btn text-white mx-2' onClick={() => { dispatch(logout()) }}>logout</button>
        <button className='btn text-white' onClick={() => { dispatch(login()) }}>login</button>
      </h1>
    </>
  )
}

export default Home