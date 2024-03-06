/**
 * The AuthLayout component in JavaScript React checks the authentication status and redirects to the
 * login page if not authenticated.
 * @returns The `AuthLayout` component is returning either a "loading..." message or the `children`
 * components based on the `loader` state. If `loader` is true, it will display "loading...", otherwise
 * it will render the `children` components.
 */
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