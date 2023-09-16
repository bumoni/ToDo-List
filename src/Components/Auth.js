import { createContext, useContext, useState } from "react";

const createAuth = createContext();

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [dataTemp, setDataTemp] = useState([]);
  const [filter,setFilter]=useState("All");
  return (
    <createAuth.Provider
      value={{
        data,
        setData,
        dataTemp,
        setDataTemp,filter,setFilter
      }}
    >
      {children}
    </createAuth.Provider>
  );
};

export const useAuth = () => useContext(createAuth);
