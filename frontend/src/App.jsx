import './App.css'
import Navbar from './components/shared/Navbar'
import Signup from './components/auth/Signup'
import Login  from './components/auth/Login'
import Home  from './components/Home'
import Jobs  from './components/Jobs'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const appRouter = createBrowserRouter([
  {
    path:'/',
    element: <Home />
  },
  {
    path:'/login',
    element: <Login />
  },
  {
    path:'/signup',
    element: <Signup />
  },
  {
    path:'/jobs',
    element: <Jobs />
  },
])

function App() {

  return (
    <>
    <RouterProvider router ={appRouter}>

    </RouterProvider>
     
    </>
  )
}

export default App
