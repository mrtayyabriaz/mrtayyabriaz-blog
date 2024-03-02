import React, { useState } from 'react'
import '../style/style.min.css'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { login } from '../store/authslice'

function Signup() {
  const [error, seterror] = useState('');

  const { register, handleSubmit } = useForm();

  const login_form = async (data) => {
    seterror('');
    console.warn('data: ');
    console.warn(data);
    try {
      const userData = await authService.createAccount(data)
      if (userData) {
        const userData = await authService.getCurrentUser();
        const udata = useDispatch(login(userData));
        console.log(userData);
      }
    } catch (error) {
      seterror(error.message);
    }
  }
  return (
    <><div className="container">

      <div className="login-form mx-auto">

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
          <label>
            Name:
            <input type="text" name="name" {...register('name', {
              required: true,
            })} />
          </label>
          <button type="submit" className='btn btn-primary'>Signup</button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Signup;