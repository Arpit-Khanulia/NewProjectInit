import React, { createContext,useState,useContext } from "react";


type UserContextProviderType = {
  children: React.ReactNode;
};

type userT = {
    name:string,
    email:string,
    password:string
}

export interface UserContextType {
  user: userT
  setUser: (user: userT) => void;
}

const defaultState = {
  user:{
    name:'',
    email:'',
    password:''
  },
  setUser:()=>{}
} as UserContextType


export const UserContext = createContext(defaultState)

export const UserContextProvider = ({children}:UserContextProviderType) => {
  
  const [user, setUser] = useState(defaultState.user);
  return <UserContext.Provider value={{user,setUser}}>{children}</UserContext.Provider>
};


export const  useUserContext = ()=> useContext(UserContext);


