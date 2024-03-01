import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { login, logout } from './store/authslice'
import Header from './components/header'
import ProjectRoutes from './routes'

// import Button from 'react-bootstrap/Button';
// or less ideally
// import { Button } from 'react-bootstrap';

function App() {
  const loginStatus = useSelector(state => state.LoginStatus)
  const dispatch = useDispatch();

  useEffect(() => {

  }, [])

  return (
    <>
    
      <ProjectRoutes />
      {/* <Header /> */}
      {/* <h1>
        {loginStatus ? 'Login Success' : 'Login Please'}
        <button onClick={() => { dispatch(logout()) }}>logout</button>
        <button onClick={() => { dispatch(login()) }}>login</button>
      </h1> */}
    </>
  )
}

export default App
