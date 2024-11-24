import { IPatient } from "@/models/Patient/Patient.interface"
import { createContext, useContext } from "react"

interface ListPatientsContextType {
    patients: IPatient[]
    setPatients: (patients: any) => void
}

export const ListPatientsContext = createContext<ListPatientsContextType | undefined> (undefined)

export function useListPatients() {
    const context = useContext(ListPatientsContext)
    if (!context) {
        throw new Error('useListPatients must be used within a ListPatientsContext Provider')
    }
    return context

}