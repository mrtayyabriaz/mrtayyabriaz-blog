import React, { useEffect, useState } from 'react'
import '../style/style.min.css'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/authslice'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [userData, setUserData] = useState('');
  const [error, seterror] = useState('');
  const [loginStatus, setloginStatus] = useState('');

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const Loggedin = useSelector(state => state.LoginStatus)
  const StoredUserData = useSelector(state => state.UserData)

  //================ session ( START ) ========================= 
  useEffect(() => {
    if (StoredUserData) {
      setUserData(StoredUserData);
      console.table(StoredUserData, 'store');

    } else {
      authService.getCurrentUser()
        .then((usersession) => {
          if (usersession) {
            dispatch(login(usersession))
            console.log(usersession, 'api');
            setUserData(usersession);
          }
        });
    }
  }, [StoredUserData])

  //================ session  ( END )  ========================= 

  //=============== handle form ( START ) ====================
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
  //=============== handle form  ( END )  ====================

  return (
    <>


      {Loggedin ?
      // ================= Logged In ( START ) ======================= 
        <div className="w-100">
          <div className="row row-cols-2 mx-2">
            <div className="card col-6">
              <div className="card-header">
                {userData.emailVerification ? <div className="text-success">Verified</div> : <div className="text-danger">Not Verified</div>}
              </div>
              <div className="card-body">
                <h5 className='card-title'>EMail: {userData.email}</h5>
                <p className='card-text'>Name: {userData.name}</p>
                <p className='card-text'>ID: {userData.$id}</p>
                <button className='btn mybtn text-white mx-2' onClick={() => {
                  navigate('/');
                }}>Home</button>
              </div>
            </div>
          </div>
        </div>
        :
      // ================= Logged In  ( END )  =======================


        <div className="container">
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
        }
    </>
  )
}

export default Login