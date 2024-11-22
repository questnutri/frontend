'use client'
import { IUser } from "@/models/User.interface"
import { createContext, useContext } from "react"

type UserContextType = {
    user: IUser | null
    setUser: (user: IUser | null) => void
    role: 'nutritionist' | 'patient' | 'admin' | null
    setRole: (role: 'nutritionist' | 'patient' | 'admin' | null) => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) throw new Error('useUser must be used within a userContextProvider')
    return context
}