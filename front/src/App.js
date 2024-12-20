import React from "react";
import { BrowserRouter } from "react-router-dom";
import FullApp from "./components/FullApp";
import { createContext, useState } from "react";

export const UserContext = createContext();

function App() {
  const [currentUser, setcurrentUser] = useState(null);

  return (
    <UserContext.Provider value={{ currentUser, setcurrentUser }}>
      <BrowserRouter>
        <FullApp />
      </BrowserRouter>
    </UserContext.Provider>
  );
}
export default App;
