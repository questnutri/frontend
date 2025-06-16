import QN_ConditionalRender from "@/components/QN_Components/QN_ConditionalRender"
import QN_DropDown from "@/components/QN_Components/QN_DropDown"
import QN_Input from "@/components/QN_Components/QN_Input"
import { usePopUpGlobal } from "@/components/QN_Components/QN_PopUp/popup.global.context"
import AlimentPage from "@/components/QN_Feature/Pages/AlimentPage"
import { FaSearch } from '@/icons'
import { use, useEffect, useState } from "react"
import { QN_PopUp } from "@/components/QN_Components/QN_PopUp"
import { useFood } from "../FoodDisplay/context"
import QN_Button from "@/components/QN_Components/QN_Button"
import { IAliment } from "@/models/Aliment.interface"
import NutricionalTable from "../new/nutritionalTable"
import { useDietDisplayContext } from "@/context/diet/diet.displayContextualizer"
import { useDiet } from "@/context/diet/refactoredDietContextProvider"
import PopUp from "@/components/QN_Components/QN_PopUp/PopUp.class"

export default function AlimentDisplay({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (value: boolean) => void }) {
    const dietCtx = useDiet();
    const food = dietCtx.claimedFood;

    const [openPopUp, setOpenPopUp] = useState(false)
    const [aliment, setAliment] = useState<IAliment | null>(null)
    const [quantity, setQuantity] = useState<number | null>(null)
    const [unit, setUnit] = useState("g")
    const [observation, setObservation] = useState("");
    const { showPopUp } = usePopUpGlobal();

    const handleSave = async () => {
        console.log("quantity: ", quantity)
        if (!quantity || quantity! <= 0) {
            showPopUp(
                new PopUp()
                    .title("Quantidade selecionada deve ser maior do que zero")
                    .width("250px")
                    .okButton()
                    .build()
            )
            return
        }
        if (!aliment) {
            showPopUp(
                new PopUp()
                    .title("Selecione um alimento")
                    .width("250px")
                    .okButton()
                    .build()
            )
            return
        }

        const res = await dietCtx.saveFood();
        if (res) {
            setIsOpen(false);
            console.log("Tried to close popup");
        }
    }

    useEffect(() => {
        if (food) {
            if (food.aliment) setAliment(food.aliment)
            if (food.quantity) setQuantity(food.quantity)
            if (food.unit) setUnit(food.unit)
            if (food.observation) setObservation(food.observation)
        }
    }, [])

    useEffect(() => {
        setOpenPopUp(false)
        if (food) {
            food.aliment = aliment
        }
    }, [aliment]);

    useEffect(() => {
        if (food) food.quantity = quantity
    }, [quantity])

    useEffect(() => {
        if (food) food.unit = unit
    }, [unit])

    useEffect(() => {
        if (food) food.observation = observation
    }, [observation])


    return (
        <div style={{ padding: "20px", width: '100%', margin: "0 auto" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <h1 style={{ fontSize: "24px" }}>Alimento Principal</h1>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                    marginBottom: "20px",
                }}
            >
                <QN_Input
                    type="text"
                    value={aliment?.name || 'Nenhum selecionado'}
                    onChange={() => { }}
                    startContent={
                        <QN_ConditionalRender
                            nutritionist={
                                <div style={{ marginRight: '10px' }}>
                                    <FaSearch
                                        color="#23a3ff"
                                        size={20}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setOpenPopUp(true)}
                                    />
                                </div>
                            }
                        />
                    }
                />
                <QN_Input
                    type="number"
                    value={`${quantity ?? food?.quantity ?? 0}`}
                    onChange={(e) => {
                        const value = Number(e.target.value)
                        setQuantity(value < 0 ? 0 : value)
                    }}
                />
                <QN_DropDown
                    items={[{ label: 'g', value: 'g' }]}
                    value={unit}
                    onChange={(val) => setUnit(val)}
                />
                <QN_Button
                    onClick={handleSave}
                    width="auto"
                    height="40px"
                    colorStyle="blue"
                    borderRadius="4px"
                    fontSize="14px"
                >
                    Salvar
                </QN_Button>
            </div>
            <div style={{ marginBottom: "20px" }}>
                <h3>Observações do Alimento:</h3>
                <textarea
                    value={observation}
                    onChange={(e) => setObservation(e.target.value)}
                    style={{
                        width: "100%",
                        height: "80px",
                        padding: "10px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
                />
            </div>

            <NutricionalTable aliment={food?.aliment || aliment} quantity={quantity ?? 0} unit={unit} />

            {/* <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                {["Proporção Nutricional na Refeição", "Proporção Nutricional na Dieta Inteira"].map((title) => (
                    <div
                        key={title}
                        style={{
                            flex: 1,
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "10px",
                        }}
                    >
                        <h3 style={{ marginBottom: "10px" }}>{title}:</h3>
                        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                            <tbody>
                                {["Valor energético", "Carboidratos", "Proteínas", "Gorduras Totais", "Gorduras Saturadas", "Fibra Alimentar", "Sódio"].map(
                                    (item) => (
                                        <tr key={item}>
                                            <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>{item}</td>
                                            <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>0g + (0g)</td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div> */}

            <QN_PopUp
                isPopUpOpen={openPopUp}
                setPopUpOpen={setOpenPopUp}
                styleConfig={{
                    windowConfig: {
                        width: '90%',
                        height: '90%',
                    },
                    bodyConfig: {
                        content: <AlimentPage setAliment={setAliment} />,
                    }
                }}
            />
        </div>
    )
}
