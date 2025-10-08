import { createContext } from "react";
import type { UserContextType } from "../types/user";

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export default UserContext;
