import { createContext, useContext } from "react"

export interface IUser {
    role: 'nutritionist' | 'patient' | 'admin'
    name: string
    email: string
}

type UserContextType = {
    user: IUser | null
    setUser: (user: IUser | null) => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) throw new Error('useUser must be used within a userContextProvider')
    return context
}