import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Login from './pages/Login.jsx';
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import { AuthLayout } from "./components";

function ProjectRoutes() {

  const router = createBrowserRouter(
    createRoutesFromElements(<>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="posts" element={
          <AuthLayout>
            <AllPosts />
          </AuthLayout>
        } />
      </Route>
    </>)
  )
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
export default ProjectRoutes;