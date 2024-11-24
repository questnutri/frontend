'use client'
import QN_PopUpGlobalProvider from '@/components/QN_Components/QN_PopUp/popup.global'
import { UserContext } from '@/context/user.context'
import { IUser } from '@/models/User.interface'
import { NextUIProvider } from '@nextui-org/react'
import { useState } from 'react'
export default function App({ children }: Readonly<{ children: React.ReactNode }>) {
    const [user, setUser] = useState<IUser | null>(null)
    const [role, setRole] = useState<'nutritionist' | 'patient' | 'admin' | null>(null)

    return (
        <>
            <NextUIProvider>
                <QN_PopUpGlobalProvider>
                    <UserContext.Provider value={{user, setUser, role, setRole}}>
                        {children}
                    </UserContext.Provider>
                </QN_PopUpGlobalProvider>
            </NextUIProvider>
        </>
    )
}