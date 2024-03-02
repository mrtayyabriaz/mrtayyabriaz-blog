import React, { useState } from 'react'
import '../style/style.min.css'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/authslice'

function Login() {
  const [error, seterror] = useState('');
  const [loginStatus, setloginStatus] = useState('');

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  // let storeData = useSelector(state => state.UserData)
  // let loginStatus = useSelector(state => state.LoginStatus)

  const login_form = async (data) => {
    seterror('');
    console.warn('data: ');
    console.warn(data);
    try {
      const userData = await authService.login(data);

      if (userData) {
        const userData = await authService.getCurrentUser();
        dispatch(login(userData));
        console.log('Success Login: ', userData);
        setloginStatus(true);
      } else {
        console.warn('login error');
      }
    }
    catch (error) {
      seterror(error.message);
    }
  }
  return (
    <><div className="container">
      <div className="message">{loginStatus ? <div className='text-success'>Login Success</div> : ''}</div>
      <div className="login-form mx-auto">
        {error && <div className="ms-auto fw-bolder pointer" onClick={() => seterror(false)}>X</div>}
        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit(login_form)}>
          <label>
            Email:
            <input type="email" name="email" {...register('email', {
              required: true,
              maxLength: 50,
              // validate: {
              //   matchPatern: (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/.
              //     test(value) || "email must be valid",
              // },
              // onChange: (e) => {
              //   console.log(e.target.value);
              // }
            })} />
          </label>
          <label>
            Password:
            <input type="password" name="password" {...register('password')} />
          </label>
          {loginStatus ?
            <button type="submit" disabled className={`btn btn-success`}>Logged In</button>
            :
            <button type="submit" className='btn mybtn btn-primary'>Login</button>
          }
        </form>
      </div>
    </div>
    </>
  )
}

export default Login