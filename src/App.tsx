import { useEffect } from 'react'
import './App.css'
import User from './store/user'
import { useHookstate } from "@hookstate/core";
import Auth from './store/auth'
import { RouterProvider } from "react-router-dom";
import UserRoutes from './routes/UserRoutes'

function App() {
  const userState = useHookstate(User.state)
  useEffect(() => {
    if (!userState.token.get()) return;
    Auth.decodeJWT();
  }, [userState.token.get()]);

  return (
    <>
      <RouterProvider router={UserRoutes()}/>
    </>
  )
}

export default App
