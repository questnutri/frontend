'use client'
import { QN_NutritionistPatientProvider } from "@/context/modal.patient.context";
import NutritionistNavbar from "@/components/Nutritionist/Navbar";
import { useEffect } from "react";
import { useUser } from "@/context/user.context";
import { findCookie } from "@/lib/findCookie";
import QN_ConditionalRender from "@/components/QN_Components/QN_ConditionalRender";
import PatientNavbar from "@/components/Patient/Navbar";

export default function LoggedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const { setUser, role, setRole } = useUser()

    useEffect(() => {
        const userData = localStorage.getItem('user')
        if (userData) {
            setUser(JSON.parse(userData))
        } else {
            setUser(null)
        }
        if (setRole) setRole(findCookie('role') as 'nutritionist' | 'patient' | 'admin' | null)
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
            <QN_ConditionalRender
                nutritionist={
                    <>
                        <NutritionistNavbar />
                        <div style={{ flexGrow: 1, padding: '20px' }}>
                            <QN_NutritionistPatientProvider>
                                {children}
                            </QN_NutritionistPatientProvider>
                        </div>
                    </>
                }
                patient={
                    <>
                        <PatientNavbar />
                        <div style={{ flexGrow: 1, padding: '20px' }}>
                            {children}
                        </div>
                    </>
                }
            />
        </div>
    )
}