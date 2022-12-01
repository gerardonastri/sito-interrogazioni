import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import NewDeatils from './pages/NewDetails/NewDeatils'
import Admin from './pages/Admin/Admin'
import UserDetails from './pages/UserDetails/UserDetails'


const Layout = () => {
  return(
    <>
      <Navbar/>
      <Outlet />
      {/* <Footer/> */}
    </>
  )
}


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        // {
        //   path: "/post/:id",
        //   element: <Single />
        // },
        {
          path: "/details",
          element: <NewDeatils />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    }, {
      path: "/admin",
      element: <Admin />
    },
    {
      path: "/admin/user/:id",
      element: <UserDetails />
    }
  ])

  return (
    <div className='app'>
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
