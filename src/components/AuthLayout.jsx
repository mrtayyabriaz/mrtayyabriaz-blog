import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({ children, authantication = true }) => {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const LoginStatus = useSelector(state => state.LoginStatus)

  useEffect(() => {
    if (authantication && LoginStatus !== authantication) {
      setLoader(false)
      navigate('/login')
    } else {
      setLoader(false)
    }
  }, [authantication, LoginStatus])


  return (
    <>
      {loader ? 'loading...' : null}
      {children}
    </>
  )
}

export default AuthLayout;