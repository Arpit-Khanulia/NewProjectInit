import React, { createContext,useContext,useState } from "react";

type ThemeContextProviderType = {
  children: React.ReactNode;
};

export interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const defaultState = {
  theme:'',
  setTheme:()=>{}
} as ThemeContextType


export const ThemeContext = createContext(defaultState)

export const ThemeContextProvider = ({children}:ThemeContextProviderType) => {
  
  const [theme, setTheme] = useState("grey");
  return <ThemeContext.Provider value={{theme,setTheme}}>{children}</ThemeContext.Provider>
};


export const useThemeContext = ()=>useContext(ThemeContext);

