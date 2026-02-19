import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider.jsx";
import api from "../api/axios.js";

const Navbar = () => {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await api.post("/user/logout");
      localStorage.removeItem("userData");
      setAuthUser(null);
      console.log("Logout response:", res.data);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="navbar bg-gray-900 text-white px-6">
      <Link to="/" className="text-xl font-bold">
        AI Tutor
      </Link>

      <div className="ml-auto flex gap-4">
        {authUser ? (
          <>
            <button onClick={logout} className="btn btn-sm btn-error">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-sm btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
