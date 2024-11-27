'use client'
import { IDiet, IMeal } from "@/models/Patient/Diet/Diet.interface"
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { useNutritionistPatient } from "./modal.patient.context"

type DietContextType = {
    diet: IDiet | null
    setDiet: Dispatch<SetStateAction<IDiet | null>>
    meals: IMeal[] | null
    setMeals: Dispatch<SetStateAction<IMeal[] | null>>
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
    refDay: number
    mealDatabaseStateHolder?: IMeal | null

}

export const MealContext = createContext<MealContextType | undefined>(undefined)

export const useMeal = () => {
    const context = useContext(MealContext)
    if (!context) throw new Error('useMeal must be used within a MealContextProvider')
    return context
}

export function MealContextProvider({refDay, mealIndex, children}: {refDay: number, mealIndex: number, children: React.ReactNode}) {
    const {patient} = useNutritionistPatient()
    const {diet, meals, setMeals} = useDiet()
    const [meal, setMeal] = useState<IMeal | null>(diet?.meals!.at(mealIndex) || null)

    const changeMeal = () => {
        if (meals && setMeals && meal) {
            setMeals([
                ...meals.slice(0, mealIndex),
                meal,
                ...meals.slice(mealIndex + 1),
            ])
        }
    }

    //re-renders meal when diets is updated
    useEffect(() => {
        setMeal(diet!.meals!.at(mealIndex) || null)
        console.log('Single meal Updated')
    }, [diet])

    return (
        <MealContext.Provider value={{meal, changeMeal, refDay}}>
            {children}
        </MealContext.Provider>
    )
}