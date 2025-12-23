import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../utils/auth";
import UserContext from "../../Contexts/UserContext";

const LogOut = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  
  useEffect(() => {
    signOut();
    setUser(null);
    navigate("/", { replace: true });
  }, [setUser, navigate]);

  return null;
};

export default LogOut; 