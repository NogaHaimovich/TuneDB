import { createContext } from "react";
import type { UserPayload, UserContextType } from "../types/user";

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export default UserContext;
