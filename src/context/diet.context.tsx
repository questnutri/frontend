'use client'
import { IDiet, IFood, IMeal } from "@/models/Patient/Diet/Diet.interface"
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { useNutritionistPatient } from "./modal.patient.context"
import { updatePatientMeal } from "@/lib/fetchPatients"
import { usePopUpGlobal } from "@/components/QN_Components/QN_PopUp/popup.global.context"
import { usePopUp } from "@/components/QN_Components/QN_PopUp/popup.context"
import { createFood, deletePatientMeal } from "@/lib/Diet/diet.api"
import { useUser } from "./user.context"

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
    refDay: number
    mealChanges: IMeal | null
    handleMealChange: (field: keyof IMeal, value: any) => void
    acceptMealChanges: () => Promise<void>
    denyMealChanges: (afterAction?: () => void) => void

    isDone?: boolean

    foods: IFood[]
    handleFoodCreation: () => Promise<void>
}

export const MealContext = createContext<MealContextType | undefined>(undefined)

export const useMeal = () => {
    const context = useContext(MealContext)
    if (!context) throw new Error('useMeal must be used within a MealContextProvider')
    return context
}

export function MealContextProvider({ refDay, mealIndex, children }: { refDay: number, mealIndex: number, children: React.ReactNode }) {
    const {role} = useUser()
    const { patient, fetchPatient } = useNutritionistPatient()
    const { diet, meals, setMeals } = useDiet()

    const { showPopUp } = usePopUpGlobal()

    const [meal, setMeal] = useState<IMeal | null>(diet?.meals!.at(mealIndex) || null)

    //re-renders meal when diets is updated
    useEffect(() => {
        setMeal(diet!.meals!.at(mealIndex) || null)
    }, [diet])


    //Updates mealChanges if meal is reloaded
    const [mealChanges, setMealChanges] = useState<IMeal | null>(null)
    useEffect(() => {
        if (meal) setMealChanges(meal)
    }, [meal])


    const [foods, setFoods] = useState<IFood[]>(meal?.foods || [])
    useEffect(() => {
        setFoods(meal?.foods || [])
    }, [meals, meal])


    //Updates mealChanges
    const handleMealChange = (field: keyof IMeal, value: any) => {
        if (mealChanges) {
            setMealChanges({
                ...mealChanges,
                [field]: value,
            })
        }
    }

    //Pushes meal changes to database and resync
    const acceptMealChanges = async () => {
        console.log(meal!.daysOfWeek.length)
        if (mealChanges!.daysOfWeek.length === 0) {
            showPopUp({
                windowConfig: {
                    width: '300px'
                },
                titleConfig: {
                    title: 'Atenção!',
                },
                bodyConfig: {
                    content: 'Essa refeição não tem nenhum dia ativo atribuído e será excluída.'
                },
                customButtons: {
                    items: [
                        {
                            text: 'Excluir refeição',
                            colorStyle: 'red',
                            onClick: async () => {
                                const res = await deletePatientMeal(patient!._id, diet!._id, meal!._id)
                                if (res.status == 200) {
                                    showPopUp({
                                        titleConfig: {
                                            title: 'Refeição excluída'
                                        },
                                        defaultButtons: {
                                            okButton: true
                                        }
                                    })
                                }

                            }
                        },
                        {
                            text: 'Cancelar',
                            onClick: () => { }
                        },

                    ]
                }
            })
        } else {
            await updatePatientMeal(patient!._id, diet!._id, meal!._id, {
                ...mealChanges,
            })
            await fetchPatient() //resync
        }




    }

    const handleFoodCreation = async () => {
        if(meal) {
            console.log("Pushed new meal")
            meal.foods!.push({})
            setFoods([...foods, {_id: '1', quantity: 1, unit: "g"}])
        }
    }

    const denyMealChanges = (afterAction?: () => void): void => {
        if (checkIfMealHaveBeenUpdated()) {
            showPopUp({
                titleConfig: {
                    title: 'Atenção!',
                },
                bodyConfig: {
                    content: 'Existem alterações não salvas na refeição, deseja descartá-las?',
                },
                windowConfig: {
                    width: '350px',
                },
                customButtons: {
                    items: [
                        {
                            text: 'Descartar',
                            colorStyle: 'red',
                            onClick: async () => {
                                await fetchPatient()
                                if (afterAction) afterAction()
                            },
                            width: '150px',
                        },
                        {
                            text: 'Deixe-me pensar',
                            colorStyle: 'white',
                            onClick: () => { },
                            width: '150px',
                        },
                    ]
                }
            })
        } else {
            if (afterAction) afterAction()
        }
    }

    /**
     * Checks if meal and mealChanges have the same values. If not, means that the UI Meal State have been changed, and will return true.
     * @returns boolean true or false
     */
    const checkIfMealHaveBeenUpdated = (): boolean => {
        if (!meal || !mealChanges) return true

        try {
            for (const key of Object.keys(meal) as (keyof IMeal)[]) {
                if (meal[key] !== mealChanges[key]) return true
            }
            return false
        } catch (error) {
            return true
        }
    }


    return (
        <MealContext.Provider
            value={{
                refDay,
                meal,
                mealChanges,
                handleMealChange,
                acceptMealChanges,
                denyMealChanges,
                foods,
                handleFoodCreation
            }}>
            {children}
        </MealContext.Provider>
    )
}