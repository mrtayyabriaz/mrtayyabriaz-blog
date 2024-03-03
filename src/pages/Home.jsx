import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../store/authslice'
import authService from '../appwrite/auth'
import { useNavigate } from 'react-router-dom'
import PostEditor from './PostEditor'

const Home = () => {
 
  return (
    <>
        {/* <PostEditor /> */}
    </>
  )
}

export default Home