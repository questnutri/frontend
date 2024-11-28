'use client'
import { useState, createContext, useContext, Dispatch, SetStateAction } from "react"

export interface MealDisplayContextType {
    isOpened: boolean
    setIsOpened: Dispatch<SetStateAction<boolean>>
    toggleOpened: () => void
    isEditable: boolean
    setIsEditable: Dispatch<SetStateAction<boolean>>
    toggleEditable: () => void
}

export const MealDisplayContext = createContext<MealDisplayContextType | undefined>(undefined)

export function useMealDisplay() {
    const context = useContext(MealDisplayContext)
    if(!context) {
        throw new Error('useMealViewer can only be use within a MealDisplayContextProvider')
    }
    return context
}

export default function DietDisplay_Meal_Provider({children}: {children: React.ReactNode}) {
    const [isOpened, setIsOpened] = useState(false)
    const [isEditable, setIsEditable] = useState(false)

    const toggleOpened = () => setIsOpened(!isOpened)
    const toggleEditable = () => setIsEditable(!isEditable)

    return (
        <MealDisplayContext.Provider value={{isOpened, toggleOpened, setIsOpened, isEditable, setIsEditable, toggleEditable, }}>
            {children}
        </MealDisplayContext.Provider>
    )
}