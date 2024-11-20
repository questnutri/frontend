'use client'
import { QN_PopUp } from "@/components/QN_PopUp";
import { QN_NutritionistPatientProvider } from "@/context/modal.patient.context";
import NutritionistNavbar from "@/components/Nutritionist/Navbar";
import { useEffect, useState } from "react";
import { IUser, UserContext } from "@/context/user.context";

export default function LoggedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const [user, setUser] = useState<IUser | null>(null)
    const [logoutPopUp, setLogoutPopUp] = useState(false)

    useEffect(() => {
        const userData = localStorage.getItem('user')
        if (userData) {
            setUser(JSON.parse(userData))
        } else {
            setUser(null)
        }
    }, [])

    return (
        <UserContext.Provider value={{user, setUser}}>
            <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
                <NutritionistNavbar />
                <div style={{ flexGrow: 1, padding: '20px' }}>
                    <QN_NutritionistPatientProvider>
                        {children}
                    </QN_NutritionistPatientProvider>
                </div>
                <QN_PopUp
                    isPopUpOpen={logoutPopUp}
                    setPopUpOpen={setLogoutPopUp}
                    config={
                        {
                            message: 'Você foi desconectado',
                            okButton: true
                        }
                    }
                />
            </div >
        </UserContext.Provider>

    )
}