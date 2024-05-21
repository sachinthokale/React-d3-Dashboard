import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const MyContext = createContext();

// eslint-disable-next-line react/prop-types
export const MyProvider = ({ children }) => {
  const [filterContextData, setFilterContextData] = useState([]);

  return (
    <MyContext.Provider value={{ filterContextData, setFilterContextData }}>
      {children}
    </MyContext.Provider>
  );
};
