import { Diet, Food, Meal } from "@/utils/interfaces/Diet.interfaces"
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"
import { useNutritionistPatient } from "../modal.patient.context"
import { DietDisplayContextualizer, useDietDisplayContext } from "./diet.displayContextualizer"
import { createFood, updateFood } from "@/lib/Diet/diet.api"
import { usePopUpGlobal } from "@/components/QN_Components/QN_PopUp/popup.global.context"

import { deleteFood as apiDeleteFood } from "@/lib/Diet/diet.api";
import PopUp from "@/components/QN_Components/QN_PopUp/PopUp.class"


type DietContextType = {
    diet: Diet | null
    getMeal: (id: string) => Meal | null
    getFood: (id: string) => Food | null
    addMeal: (meal: Partial<Meal>) => void
    addFood: (meal: string) => void

    claimMealControl: (meal: string) => void
    claimFoodControl: (food: Partial<Food>) => void
    claimedFood: Partial<Food> | null
    saveFood: () => Promise<boolean>
    deleteFood: (mealId: string, foodId: string) => void
}

export const DietContext = createContext<DietContextType | undefined>(undefined)


type DietProviderProps = {
    children: ReactNode
    initialDiet?: Diet | null
}

export function useDiet() {
    const context = useContext(DietContext)
    if (!context) {
        throw new Error('useDiet must be used within a DietContextProvider')
    }
    return context
}

export function DietProvider({ children, initialDiet = null }: DietProviderProps) {
    const { patient, fetchPatient } = useNutritionistPatient();
    const [diet, setDiet] = useState<Diet | null>(initialDiet);

    const display = useDietDisplayContext();

    useEffect(() => {
        if (patient) {
            console.log("Patient defined");
            setDiet(patient.diets?.[0] || null);
        }
    }, [patient]);

    useEffect(() => {
        if (diet) {
            console.log("Diet defined");
            console.log(diet.meals);
        }
    }, [diet]);

    const [claimedMeal, setClaimedMeal] = useState<string | null>(null);
    const addMeal = (meal: Partial<Meal>) => {
        console.log("Trying to add meal: ", meal);
        console.log("Target patient: ", patient?._id);
    }

    const claimMealControl = (meal: string) => {
        setClaimedMeal(meal);
    }

    const addFood = (mealId: string) => {
        claimFoodControl({
            quantity: 0,
            unit: 'g'
        });
        setClaimedMeal(mealId);
        display.setOpenFoodCreation(true);
    }

    const getMeal = useCallback(
        (id: string): Meal | null => {
            if (!diet) return null
            return diet.meals.find((meal) => meal._id === id) ?? null
        },
        [diet]
    )

    const getFood = useCallback(
        (id: string): Food | null => {
            if (!diet) return null
            for (const meal of diet.meals) {
                const food = meal.foods.find((food: Food) => food._id === id)
                if (food) return food
            }
            return null
        },
        [diet]
    )

    const [claimedFood, setClaimedFood] = useState<Partial<Food> | null>(null);
    const claimFoodControl = (food: Partial<Food>) => {
        if (claimedFood != food) {
            setClaimedFood(food);
            console.log("Food control claimed: ", food);
        }
    }

    const saveFood = async () => {
        if (patient && diet && claimedMeal && claimedFood) {
            let res;
            if (!claimedFood._id) {
                res = await createFood(patient!._id, diet!._id, claimedMeal, {
                    ...claimedFood
                })
            } else {
                res = await updateFood(patient!._id, diet!._id, claimedMeal, claimedFood._id, { ...claimedFood });
            }
            if (res.status == 201 || res.status == 200) {
                showPopUp(
                    new PopUp()
                        .title("Alimento salvo")
                        .width("250px")
                        .okButton()
                        .build()
                )
                await fetchPatient();
                return true;
            }
        }
        showPopUp(
            new PopUp()
                .title("Houve um erro ao salvar o alimento")
                .width("250px")
                .okButton()
                .build()
        )
        return false;
    }

    const { showPopUp } = usePopUpGlobal()
    const deleteFood = async (mealId: string, foodId: string) => {
        if (patient && diet) {
            const res = await apiDeleteFood(patient!._id, diet!._id, mealId, foodId);
            if (res.status === 200) {
                await fetchPatient()
                showPopUp({
                    windowConfig: {
                        width: '250px'
                    },
                    titleConfig: {
                        title: 'Alimento excluído'
                    },
                    defaultButtons: {
                        okButton: true
                    }
                })
                display.signalUpdate();
            }
        }

    }

    return (
        <DietContext.Provider value={{
            diet,
            getMeal,
            getFood,
            addMeal,
            addFood,
            claimFoodControl,
            claimedFood,
            saveFood,
            claimMealControl,
            deleteFood
        }}>
            {children}
        </DietContext.Provider>
    )
}
