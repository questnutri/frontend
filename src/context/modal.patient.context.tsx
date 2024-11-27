'use client'
import { fetchOnePatient } from "@/lib/fetchPatients"
import { IPatient } from "@/models/Patient/Patient.interface"
import { createContext, ReactNode, useContext, useState } from "react"

interface NutritionistPatientContextType {
    patient: IPatient | null
    setModalPatient: (id: string | null) => void
    fetchPatient: () => Promise<void>
}

export const NutritionistPatientContext = createContext<NutritionistPatientContextType | undefined>(undefined)

export function useNutritionistPatient() {
    const context = useContext(NutritionistPatientContext)
    if (!context) {
        throw new Error('useNutritionistPatient must be used within a NutritionistPatientProvider')
    }
    return context
}

export function QN_NutritionistPatientProvider({ children }: { children: ReactNode }) {
    const [patient, setPatient] = useState<IPatient | null>(null)

    const setModalPatient = async (id: string | null) => {
        console.log('Patient setted')
        if (!id) {
            setPatient(null)
            return
        }
        try {
            const response = await fetchOnePatient(id as string)
            setPatient(response.data)
        } catch (error) {
            setPatient(null)
        }
    }

    const fetchPatient = async () => {
        await setModalPatient(patient!._id)
    }

    return (
        <NutritionistPatientContext.Provider value={{ patient, setModalPatient, fetchPatient}}>
            {children}
        </NutritionistPatientContext.Provider >
    )
}