import { createContext, ReactNode, useState } from "react"

interface IPatient {
    id: string | null
    name: string
    email: string
}

interface IPatientModalContext {
    patient: IPatient | null
    showPatient: (id: string) => void
    hidePatient: () => void
}

export const PatientModalContext = createContext<IPatientModalContext>({
    patient: null,
    showPatient: (id) => {},
    hidePatient: () => {}
})

export function PatientModalProvider({ children }: { children: ReactNode }) {
    const [patient, setPatient] = useState(null)

    const showPatient = (id: string) => {
        setPatient(patient)
        
    }
}