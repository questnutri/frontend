import { useFood } from "@/components/QN_Feature/Display/Patient/Diet/FoodDisplay/context"
import { FaTrash } from '@/icons'
import { MdEdit } from "react-icons/md"
import FoodDisplay_Nutrients from "./nutrients"
import FoodDisplay_Info from "./info"
import { Divider } from "@nextui-org/react"
import { usePopUpGlobal } from "@/components/QN_Components/QN_PopUp/popup.global.context"
import { SetStateAction, use, useEffect, useState } from "react"
import { QN_PopUp } from "@/components/QN_Components/QN_PopUp"
import AlimentDisplay from "../../AlimentDisplay"
import QN_ConditionalRender from "@/components/QN_Components/QN_ConditionalRender"
import { useDietDisplayContext } from "@/context/diet/diet.displayContextualizer"
import { useDiet } from "@/context/diet/refactoredDietContextProvider"
import { Food, Meal } from "@/utils/interfaces/Diet.interfaces"

export default function FoodDisplay_Component({ foodPassed, mealPassed }: { foodPassed?: Food, mealPassed?: Meal }) {
    const { food, toggleFoodEditable } = useFood()
    const { showPopUp } = usePopUpGlobal()
    const [isAlimentPopUpOpen, setIsAlimentPopUpOpen] = useState(false);
    const { isFoodCreationOpen, setOpenFoodCreation } = useDietDisplayContext();
    const display = useDietDisplayContext();
    const dietCtx = useDiet();

    useEffect(() => {
        if (isFoodCreationOpen) {
            console.log("isFoodCreationOpen is: ", isFoodCreationOpen);
        }
    }, [isFoodCreationOpen])

    const handleFoodEdit = () => {
        if (foodPassed) {
            console.log("Food: ", food);
            dietCtx.claimFoodControl(foodPassed);
            dietCtx.claimMealControl(mealPassed!._id!);
            setIsAlimentPopUpOpen(true);
        }
    }

    const handleFoodDelete = () => {
        if (mealPassed) {
            if (foodPassed && foodPassed._id) {
                dietCtx.deleteFood(mealPassed!._id!, foodPassed._id);
            }
        }
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                backgroundColor: "#EAEAEA",
                height: "55px",
                borderRadius: "10px",
                padding: "10px 20px",
                alignItems: 'center',
            }}
        >
            <h1
                style={{

                    color: "#55b7fe",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer"
                }}
                onClick={handleFoodEdit}
            >
                {food?.aliment?.name || 'Nenhum alimento selecionado'}
            </h1>
            <FoodDisplay_Info foodPassed={foodPassed} />
            <FoodDisplay_Nutrients foodPassed={foodPassed} />
            <QN_ConditionalRender
                nutritionist={
                    <>
                        <Divider orientation='vertical' />
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                            <FaTrash
                                size={'20px'}
                                color='#55b7fe'
                                style={{
                                    cursor: 'pointer',
                                    transition: 'color 0.3s ease',
                                }}
                                title='Excluir'
                                className='hover-icon'
                                onMouseEnter={(e) => (e.currentTarget.style.color = '#494a4a')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = '#55b7fe')}
                                onClick={handleFoodDelete}
                            />

                        </div>
                    </>
                }
            />

            <QN_PopUp
                isPopUpOpen={isAlimentPopUpOpen}
                setPopUpOpen={setIsAlimentPopUpOpen}
                styleConfig={{
                    windowConfig: {
                        width: '80%',
                        height: '90%',
                        padding: '0px'
                    },
                    bodyConfig: {
                        content: (
                            <AlimentDisplay isOpen={isAlimentPopUpOpen} setIsOpen={setIsAlimentPopUpOpen} />
                        ),
                    },
                    titleConfig: {
                        marginBottom: '0px'
                    }
                }}
            />
        </div>
    )
}