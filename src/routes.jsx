import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Login from './pages/Login.jsx';
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import { AuthLayout } from "./components";
import PostEditor from "./components/PostEditor.jsx";
import { Post } from "./pages/Post.jsx";
import Edit from "./pages/Edit.jsx";
import { Create } from "./pages/Create.jsx";

function ProjectRoutes() {

  const router = createBrowserRouter(
    createRoutesFromElements(<>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="login" element={
          <AuthLayout authantication={false}>
            <Login />
          </AuthLayout>} />
        <Route path="signup" element={
          <AuthLayout authantication={false}>
            <Signup />
          </AuthLayout>
        } />
        <Route path="post/:slug" element={
          <AuthLayout authantication={false}>
            <Post />
          </AuthLayout>
        } />
        <Route path="posts" element={
          <AuthLayout authantication={false}>
            <AllPosts />
          </AuthLayout>
        } />
        <Route path="create" element={
          <AuthLayout authantication>
            <Create />
          </AuthLayout>
        } />
        <Route path="edit/:slug" element={
          <AuthLayout authantication={false}>
            <Edit />
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