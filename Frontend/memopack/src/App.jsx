
import { Toaster } from 'react-hot-toast'
import { Routes, Route, Navigate } from "react-router-dom";
import Register from './component/signup.jsx'
import Login from './component/Login.jsx'

import Home from './component/Home.jsx';
import { useAuth } from '../context/AuthProvider.jsx';

function App() {
  

  const [authUser, setAuthUser] = useAuth();
  if(authUser){
    console.log("authUser : ", authUser.user);
  }
  
  return (
    <>
    <Routes>
      <Route
        path="/"
        element={
          authUser ? (
            <div className="flex">
              <Home/>
            </div>
          ) : (
            <Navigate to={"/login"} />
          )
        }
      />

      <Route
        path="/login"
        element={authUser ? <Navigate to={"/"} /> : <Login />}
      />

      <Route
        path="/signup"
        element={authUser ? <Navigate to={"/"} />:<Register />  }
      />
    </Routes>
    <Toaster/>
    </>
  )
}

export default App
