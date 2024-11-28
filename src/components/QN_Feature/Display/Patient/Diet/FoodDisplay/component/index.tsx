import { useFood } from "@/components/QN_Feature/Display/Patient/Diet/FoodDisplay/context"
import { FaTrash } from '@/icons'
import { MdEdit } from "react-icons/md"
import FoodDisplay_Nutrients from "./nutrients"
import FoodDisplay_Info from "./info"
import { Divider } from "@nextui-org/react"
import QN_AlimentInfo from "../../QN_AlimentInfo"
import { usePopUpGlobal } from "@/components/QN_Components/QN_PopUp/popup.global.context"
import { SetStateAction, useState } from "react"
import { QN_PopUp } from "@/components/QN_Components/QN_PopUp"
import AlimentDisplay from "../../AlimentDisplay"

export default function FoodDisplay_Component() {
    const { food, toggleFoodEditable, handleFoodDelete } = useFood()
    const { showPopUp } = usePopUpGlobal()


    const [isAlimentPopUpOpen, setIsAlimentPopUpOpen] = useState(false)
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
                }}
                onClick={() => {
                    setIsAlimentPopUpOpen(true)
                }}
            >
                {food?.aliment?.name || 'Nenhum alimento selecionado'}
            </h1>
            <FoodDisplay_Info />
            <FoodDisplay_Nutrients />
            <Divider orientation='vertical' />
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <MdEdit
                    size={'23px'}
                    color='#55b7fe'
                    style={{
                        cursor: 'pointer',
                        transition: 'color 0.3s ease',
                    }}
                    title='Editar'
                    className='hover-icon'
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#494a4a')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#55b7fe')}
                    onClick={toggleFoodEditable}
                />
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
                            <AlimentDisplay />
                        ),
                    }
                }}
            />
        </div>
    )
}