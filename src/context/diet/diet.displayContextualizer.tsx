import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { DietContext, DietProvider } from "./refactoredDietContextProvider"
import { Food } from "@/utils/interfaces/Diet.interfaces"

type DietDisplayContextualizer = {
    updatedDiet: boolean,
    setUpdatedDiet: (value: boolean) => void
    updatedMeal: boolean,
    setUpdatedMeal: (value: boolean) => void
    updatedFood: boolean,
    setUpdatedFood: (value: boolean) => void
    isFoodCreationOpen: boolean,
    setOpenFoodCreation: React.Dispatch<React.SetStateAction<boolean>>
    closeFoodCreation: () => void,
    signalUpdate: () => void
    isUpdated: boolean
    openFoodEditor: () => void,
}

export const DietDisplayContextualizerContext = createContext<DietDisplayContextualizer | undefined>(undefined)

export function useDietDisplayContext() {
    const context = useContext(DietDisplayContextualizerContext)
    if (!context) {
        throw new Error('useDietDisplay must be used within a DietDisplayContextualizer')
    }
    return context
}

export function DietDisplayContextualizer({ children }: { children: ReactNode }) {
    const [updatedDiet, setUpdatedDiet] = useState(false);
    const [updatedMeal, setUpdatedMeal] = useState(false);
    const [updatedFood, auxSetUpdatedFood] = useState(false);
    const [auxUpdatedFood, setUpdatedFood] = useState(false);
    const [isFoodCreationOpen, setOpenFoodCreation] = useState<boolean>(false);

    useEffect(() => {
        if (auxUpdatedFood) {
            auxSetUpdatedFood(true);
            auxSetUpdatedFood(false);
            setUpdatedFood(false);
        }
    }, [auxUpdatedFood]);


    const closeFoodCreation = () => {
        setOpenFoodCreation(false);
    }

    const openFoodEditor = () => {
        setOpenFoodCreation(!isFoodCreationOpen);
        console.log("Opened food editor!");
    }

    const [isUpdated, setUpdated] = useState(false);
    const signalUpdate = () => {
        setUpdated(true);
    }

    useEffect(() => {
        if (isUpdated) {
            setUpdated(false);
        }
    }, [isUpdated])

    return (
        <DietDisplayContextualizerContext.Provider
            value={{
                updatedDiet,
                setUpdatedDiet,
                updatedMeal,
                setUpdatedMeal,
                updatedFood,
                setUpdatedFood,
                isFoodCreationOpen,
                setOpenFoodCreation,
                closeFoodCreation,
                signalUpdate,
                isUpdated,
                openFoodEditor
            }}
        >
            <DietProvider>
                {children}
            </DietProvider>
        </DietDisplayContextualizerContext.Provider>
    )
}