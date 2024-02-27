import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import './App.css'
import { useEffect } from 'react'
import { login, logout } from './store/authslice'

function App() {
  const loginStatus = useSelector(state => state.LoginStatus)
  const dispatch = useDispatch();

  useEffect(() => {

  }, [])

  return (
    <>
      <h1>
        {loginStatus ? 'Login Success' : 'Login Please'}
        <button onClick={() => { dispatch(logout()) }}>logout</button>
        <button onClick={() => { dispatch(login()) }}>login</button>
      </h1>
    </>
  )
}

export default App
