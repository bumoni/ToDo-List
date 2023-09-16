import { createContext, useContext, useState } from "react";

const createAuth = createContext();

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState([]);

  return (
    <createAuth.Provider
      value={{
        data,
        setData
      }}
    >
      {children}
    </createAuth.Provider>
  );
};

export const useAuth = () => useContext(createAuth);
