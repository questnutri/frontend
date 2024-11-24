import { createContext, useContext } from "react"

export interface DietDisplayContextType {
    expandedDay: number | null
    toggleExpandedDay: (day: number) => void
}

export const DietDisplayContext = createContext<DietDisplayContextType | undefined>(undefined)

export function useDietDisplay() {
    const context = useContext(DietDisplayContext)
    if(!context) {
        throw new Error('useDietDisplay should be within a DietDisplayContextProvider')
    }
    return context
}