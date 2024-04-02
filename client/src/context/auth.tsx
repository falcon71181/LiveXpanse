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
    const [authUser, setAuthUser] = useState<AuthUser | null>(null)

    useEffect(() => {
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        if (username && token) {
            const authUserDetails: AuthUser = { username, token }
            setAuthUser(authUserDetails);
        }
    }, [])

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider };
