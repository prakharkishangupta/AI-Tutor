import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userData");
    setAuthUser(null);
    navigate("/login");
  };

  return (
    <div className="navbar bg-gray-900 text-white px-6">
      <Link to="/" className="text-xl font-bold">
        AI Course
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
