import  { useEffect, useContext } from "react";
import { signOut } from "../../Services/userService";
import UserContext from "../../Contexts/UserContext";

const LogOut = () => {
    const { setUser } = useContext(UserContext);
    
    useEffect(()=>{
        signOut();
        setUser(null);
        window.location.href = "/";

    }, [setUser])

  return null;
}
export default LogOut 