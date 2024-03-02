import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../store/authslice'
import authService from '../appwrite/auth'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [userData, setUserData] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector(state => state.LoginStatus)
  const UserData = useSelector(state => state.UserData)
  
  useEffect(() => {


    if (UserData) {
      setUserData(UserData);
      console.table(UserData, 'store');

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
  }, [UserData])

  return (
    <>
      {loginStatus ?
        <div className="w-100">
          <div className="row row-cols-2 mx-2">
            <div className="card col-6">
              <div className="card-header">
                {userData.emailVerification ? <div className="text-success">Verified</div> : <div className="text-danger">Not Verified</div>}
              </div>
              <div className="card-body">
                <h5 className='card-title'>{userData.email}</h5>
                <p className='card-text'>{userData.name}</p>
                <button className='btn mybtn text-white mx-2' onClick={() => {
                  dispatch(logout())
                  authService.logout();
                  navigate('/login');
                }}>logout</button>
              </div>
            </div>
          </div>
        </div>
        : 'Logged Out'}
    </>
  )
}

export default Home