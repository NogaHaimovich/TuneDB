import { useState, useEffect } from "react";
import { BrowserRouter, Routes } from "react-router-dom";

import NavBar from './components/NavBar';
import UserContext from './Contexts/UserContext';

import './App.css';
import './styles/settings.scss';
import { getUser } from "./Services/userService";
import PublicRoutes from "./routes/public";
import ProtectedRoutes from "./routes/protected";

function App() {
  const [user, setUser] = useState(getUser()); 

  useEffect(() => {
    const jwtUser = getUser();

    if (jwtUser) {
      if (jwtUser.exp && Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        setUser(null); 
      } else {
        setUser(jwtUser);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <div className="app-container">
          <NavBar />
          <main>
            <Routes>
              {PublicRoutes()}
              {ProtectedRoutes()}
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
