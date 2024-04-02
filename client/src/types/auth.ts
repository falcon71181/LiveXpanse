import { Dispatch, SetStateAction } from "react";

type AuthUser = {
    username: string;
    token: string;
}

type AuthContextType = {
    authUser: AuthUser | null;
    setAuthUser: Dispatch<SetStateAction<AuthUser | null>>;
}

export type { AuthUser, AuthContextType };
