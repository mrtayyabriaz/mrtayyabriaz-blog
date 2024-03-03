import { useDispatch } from 'react-redux';
import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from '../store/authslice';

function Header() {
  const LoginStatus = useSelector(state => state.LoginStatus)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand bg-body-tertiary p-fixed">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Tayyab Riaz</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            {LoginStatus ? <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/posts">Posts</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/create">Write</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className='nav-link btn mybtn text-white mx-2' onClick={() => {
                  dispatch(logout())
                  authService.logout();
                  navigate('/login');
                }}>logout</NavLink>
              </li>
            </>
              :
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">Signup</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
