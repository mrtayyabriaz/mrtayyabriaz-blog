import React, { useState } from 'react'
import '../style/style.min.css'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import {login} from '../store/authslice'

function Login() {
  const { register, handleSubmit } = useForm();

  const [error, seterror] = useState('');


  const login_form = async (data) => {
    seterror('');
    console.warn('data: ');
    console.warn(data);
    try {
      console.log('before data');
      const userData = await authService.login(data);
      console.log('after data');
      if (userData) {
        const userData = await authService.getCurrentUser();
        useDispatch(login(userData));
        console.log('Success Login: ',userData);
      }else{
        console.warn('login error');
      }
    } catch (error) {
      seterror(error.message);
    }
  }
  return (
    <><div className="container">

      <div className="login-form mx-auto">
        {error && <div className="ms-auto fw-bolder pointer" onClick={()=>seterror(false)}>X</div>}
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
          <button type="submit" className='btn btn-primary'>Login</button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login