import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import api from "../src/api/axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get(
          "/user/me"
          
        );

        setAuthUser(res.data.user);
      } catch (err) {
        console.log("authrefresh: ", authUser);
        console.error("err ", err)
        setAuthUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser, loading]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
