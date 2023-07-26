import React  from 'react'
import {createBrowserRouter,RouterProvider, Outlet} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import WritePage from './pages/WritePage'
import './style.css'
import SinglePage from './pages/SinglePage'
import UpdatePage from './pages/UpdatePage'

const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path : '/',
    element : <Layout/>,
    children : [
      {
        path : '/',
        element : <HomePage/>
      },
      {
        path : '/posts/:id',
        element : <SinglePage/>
      },
      {
        path : '/write',
        element : <WritePage/>
      },
      {
        path : '/update/:id',
        element : <UpdatePage/>
      }

    ] 
  },
  {
    path : '/login',
    element : <LoginPage/>
  },
  {
    path : '/register',
    element : <RegisterPage/>
  }
])

const App = () => {
  return (
    <div className='font-Montserrat dark:bg-black'>
      <RouterProvider router={router}/>
    </div>
  )
}



export default App
