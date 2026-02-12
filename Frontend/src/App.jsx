
import { Toaster } from 'react-hot-toast'
import { Routes, Route, Navigate } from "react-router-dom";
import Register from './pages/Signup.jsx'
import Login from './pages/Login.jsx';
import Structure from './pages/Structure.jsx';  
import Home from './pages/Home.jsx';
import Form from './pages/Form.jsx';
import { useAuth } from '../context/AuthProvider.jsx';
import Learning from './pages/Learning.jsx';


function App() {
  

  const [authUser, setAuthUser, loading] = useAuth();

  if (loading) return <div>Loading...</div>;

  
  
  return (
    <>
    
    <Routes>
      <Route
        path="/"
        element={
          authUser ? (
            // <div className="flex">
              <Home/>
            // </div>
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
      <Route
        path = "/form"
        element = {authUser ? <Form /> : <Navigate to="/login" />}
      />
      <Route
        path = "/structure/:courseId"
        element = {authUser ? <Structure /> : <Navigate to="/login" />}
      />
      
      <Route
        path="/learning/:courseId/:subtitleId"
        element={authUser ? <Learning /> : <Navigate to="/login" />}
      />


    </Routes>
    <Toaster/>
    </>
  )
}

export default App
