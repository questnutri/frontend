'use client'
import { useState, createContext, useContext } from "react"

export interface MealViewerContextType {
    isOpened: boolean
    toggleOpened: () => void
}

export const MealViewerContext = createContext<MealViewerContextType | undefined>(undefined)

export function useMealViewer() {
    const context = useContext(MealViewerContext)
    if(!context) {
        throw new Error('useMealViewer can only be use within a MealViewerContextProvider')
    }
    return context
}

export default function QN_MealViewerProvider({children}: {children: React.ReactNode}) {
    const [isOpened, setViewOpened] = useState(false)

    const toggleOpened = () => setViewOpened(!isOpened)

    return (
        <MealViewerContext.Provider value={{isOpened, toggleOpened}}>
            {children}
        </MealViewerContext.Provider>
    )
}