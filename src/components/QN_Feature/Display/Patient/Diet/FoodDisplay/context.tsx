import { usePopUpGlobal } from "@/components/QN_Components/QN_PopUp/popup.global.context";
import { useDiet, useMeal } from "@/context/diet.context";
import { useNutritionistPatient } from "@/context/modal.patient.context";
import { deleteFood } from "@/lib/Diet/diet.api";
import { IFood } from "@/models/Patient/Diet/Diet.interface";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type FoodContextType = {
    food: IFood | null,
    isFoodEditable: boolean,
    setIsFoodEditable: Dispatch<SetStateAction<boolean>>,
    toggleFoodEditable: () => void
    handleFoodDelete: () => void
}

export const FoodContext = createContext<FoodContextType | undefined>(undefined)

export function useFood() {
    const context = useContext(FoodContext)
    if(!context) {
        throw new Error('useFood can only be use within a FoodContext.Provider')
    }
    return context
}

export default function FoodContextProvider({food, children}: {food: IFood, children: React.ReactNode}) {
    const {patient, fetchPatient} = useNutritionistPatient()
    const {diet} = useDiet()
    const {meal} = useMeal()
    const {showPopUp} = usePopUpGlobal()


    const [isFoodEditable, setIsFoodEditable] = useState(false)

    const toggleFoodEditable = () => setIsFoodEditable(!isFoodEditable)

    const handleFoodDelete = async () => {
        const res = await deleteFood(patient!._id, diet!._id, meal!._id, food!._id)
        if(res.status === 200) {
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
        }
    }

    return (
        <FoodContext.Provider value={{food, isFoodEditable, setIsFoodEditable, toggleFoodEditable, handleFoodDelete}}>
            {children}
        </FoodContext.Provider>
    )
} 