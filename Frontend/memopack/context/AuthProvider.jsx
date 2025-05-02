import React, { createContext, useContext, useState } from 'react';
import Cookies from "js-cookie";
import { useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children})=> {
  const [authUser, setAuthUser] = useState(undefined);
    useEffect(()=>{
      const initialUserState = Cookies.get("jwt") || localStorage.getItem("messanger");
    
      if(initialUserState){
        const user = JSON.parse(initialUserState);
        setAuthUser(initialUserState);
      }
      console.log("auth: ", authUser);
    },[authUser])
    
  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = ()=> useContext(AuthContext) ;
