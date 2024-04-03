import {
  ReactNode,
  createContext,
  useEffect,
  useState
} from "react"
import { AuthContextType, AuthUser } from "../types/auth";


type AuthContextProviderProps = {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const SERVER = import.meta.env.VITE_SERVER;
  const [authUser, setAuthUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    // Verify User's jwt token
    const verifyUser = async () => {
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token');
      if (!username && !token) return;

      const response = await fetch(`${SERVER}/users/validate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok && username && token) {
        const authUserDetails: AuthUser = { username, token }
        setAuthUser(authUserDetails);
      }
    };
    verifyUser();
  }, [SERVER])

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider };
