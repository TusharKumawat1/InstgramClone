import React, { useState } from "react";
import { MyContext } from "./Mycontext";

type ContextApiProviderProps = {
  children: React.ReactNode;
};

export default function ContextApi({ children }: ContextApiProviderProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <MyContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </MyContext.Provider>
  );
}
