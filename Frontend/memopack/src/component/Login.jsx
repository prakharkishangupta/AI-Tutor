import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

const Login = () => {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useAuth(); // Assuming you have a way to manage auth state
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/user/login',
        { email, password },
        {
          headers: { 
            'Content-Type': 'application/json'
            
          },
          withCredentials: true 
        }
      );

      if (response.data) {
        console.log("Login response:", response.data);
        localStorage.setItem("userData", JSON.stringify(response.data));
        setAuthUser(response.data); // Update auth state
        toast.success("Login successful!");
        navigate('/'); // Redirect to dashboard after login
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Login</h1>
          <p className="py-6">Welcome back to MemoPack!</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Enter your email" 
                  className="input input-bordered" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  disabled={isLoading}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input 
                  type="password" 
                  name="password"
                  placeholder="Enter your password" 
                  className="input input-bordered" 
                  value={formData.password}
                  onChange={handleChange}
                  required 
                  disabled={isLoading}
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button 
                  type="submit" 
                  className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </div>
              <div className="text-center mt-4">
                <p>Don't have an account? 
                  <span 
                    className="text-primary cursor-pointer ml-1 hover:underline"
                    onClick={() => navigate('/signup')}
                  >
                    Sign up
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;