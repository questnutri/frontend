'use client'
import { NutritionistPatientContext, QN_NutritionistPatientProvider } from "@/context/modal.patient.context";
import NutritionistNavbar from "@/components/Nutritionist/Navbar";
import { useEffect, useState } from "react";
import { useUser } from "@/context/user.context";
import { findCookie } from "@/lib/findCookie";
import QN_ConditionalRender from "@/components/QN_Components/QN_ConditionalRender";
import PatientNavbar from "@/components/Patient/Navbar";
import { IPatient } from "@/models/Patient/Patient.interface";
import { fetchSelfPatient } from "@/lib/fetchPatients";

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

        if (findCookie('role') == 'patient') {
            getPatientData()
        }
    }, [])


    const [patient, setPatient] = useState<IPatient | null>(null)

    const getPatientData = async () => {
        const res = await fetchSelfPatient()
        setPatient(res.data)
    }

    const fetchPatient = async () => {
        getPatientData()
    }

    const setModalPatient = (id: string | null) => { }

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
                        <NutritionistPatientContext.Provider value={{ patient, setModalPatient, fetchPatient }}>
                            <div style={{ flexGrow: 1, padding: '20px' }}>
                                {children}
                            </div>
                        </NutritionistPatientContext.Provider>

                    </>
                }
            />
        </div>
    )
}