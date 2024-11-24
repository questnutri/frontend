'use client'
import { IDiet, IMeal } from "@/models/Patient/Diet/Diet.interface"
import { createContext, Dispatch, SetStateAction, useContext } from "react"

type DietContextType = {
    diet: IDiet | null
    setDiet: Dispatch<SetStateAction<IDiet | null>>
    meals?: IMeal[] | null
    setMeals?: Dispatch<SetStateAction<IMeal[] | null>>
}

export const DietContext = createContext<DietContextType | undefined>(undefined)

export const useDiet = () => {
    const context = useContext(DietContext)
    if (!context) throw new Error('useDiet must be used within a DietContextProvider')
    return context
}

type MealContextType = {
    meal: IMeal | null
    changeMeal: () => void
}

export const MealContext = createContext<MealContextType | undefined>(undefined)

export const useMeal = () => {
    const context = useContext(MealContext)
    if (!context) throw new Error('useMeal must be used within a MealContextProvider')
    return context
}

export function MealContextProvider({mealIndex, children}: {mealIndex: number, children: React.ReactNode}) {
    const {meals, setMeals} = useDiet()
    let meal = null
    if(meals && meals.length > 0) {
        meal = meals[mealIndex] 
    }

    const changeMeal = () => {
        if (meals && setMeals && meal) {
            setMeals([
                ...meals.slice(0, mealIndex),
                meal,
                ...meals.slice(mealIndex + 1),
            ])
        }
    }

    return (
        <MealContext.Provider value={{meal, changeMeal}}>
            {children}
        </MealContext.Provider>
    )
}