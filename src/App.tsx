import { useState, useEffect } from "react";
import { BrowserRouter, Routes } from "react-router-dom";

import NavBar from './components/layout/NavBar';
import UserContext from './Contexts/UserContext';

import './App.css';
import './styles/settings.scss';
import { getUser, isAuthenticated } from "./utils/auth";
import PublicRoutes from "./routes/public";
import ProtectedRoutes from "./routes/protected";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  const [user, setUser] = useState(() => {
    return isAuthenticated() ? getUser() : null;
  }); 

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getUser());
    } else {
      setUser(null);
    }
  }, []);

  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
