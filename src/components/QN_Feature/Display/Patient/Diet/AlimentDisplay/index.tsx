import QN_ConditionalRender from "@/components/QN_Components/QN_ConditionalRender"
import QN_DropDown from "@/components/QN_Components/QN_DropDown"
import QN_Input from "@/components/QN_Components/QN_Input"
import { usePopUpGlobal } from "@/components/QN_Components/QN_PopUp/popup.global.context"
import QN_Table from "@/components/QN_Components/QN_Table"
import AlimentPage from "@/components/QN_Feature/Pages/AlimentPage"
import { FaSearch } from '@/icons'
import { useState } from "react"
import AlimentTable from "./aliment.table"
import { QN_PopUp } from "@/components/QN_Components/QN_PopUp"
import { useFood } from "../FoodDisplay/context"

export default function AlimentoPrincipal() {
    const { showPopUp } = usePopUpGlobal()
    const {food} = useFood()


    const [openPopUp, setOpenPopUp] = useState(false)

    const [alimento, setAlimento] = useState("")
    const [quantidade, setQuantidade] = useState<number | null>(null)
    const [unidade, setUnidade] = useState("")
    const [observacoes, setObservacoes] = useState("")

    const handleSave = () => {
        console.log("Salvar informações", { alimento, quantidade, unidade, observacoes })
    }

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
                    value={food?.aliment?.name || 'Nenhum selecionado'}
                    onChange={() => {}}
                    startContent={
                        <QN_ConditionalRender
                            nutritionist={
                                <div style={{ marginRight: '10px' }}>
                                    <FaSearch
                                        color="#23a3ff"
                                        size={20}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => {
                                            setOpenPopUp(true)
                                        }}
                                    />
                                </div>

                            }
                        />

                    }
                />
                <QN_Input
                    type="number"
                    value={`${food?.quantity}` || '0'}
                    onChange={(e) => {
                        let value = e.target.value
                        if (Number(value) < 0) setQuantidade(0)
                        else setQuantidade(Number(e.target.value))
                    }}
                />
                <QN_DropDown
                    items={[{
                        label: 'g',
                        value: 'grams'
                    }]}
                    value={food?.unit || 'grams'}
                    onChange={() => { }}
                />
                <button
                    onClick={handleSave}
                    style={{
                        padding: "10px 20px",
                        background: "#008CBA",
                        color: "white",
                        borderRadius: "4px",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    SALVAR
                </button>
            </div>

            <div style={{ marginBottom: "20px", border: "1px solid #ccc", borderRadius: "4px", padding: "10px" }}>
                <h3 style={{ marginBottom: "10px" }}>Informações Nutricionais:</h3>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                        <tr>
                            <th style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>Porção de 100g</th>
                            <th style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>(quantidade) {unidade}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {["Valor energético", "Carboidratos", "Proteínas", "Gorduras Totais", "Gorduras Saturadas", "Fibra Alimentar", "Sódio"].map(
                            (item) => (
                                <tr key={item}>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>{item}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>0g</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>

            <div style={{ marginBottom: "20px" }}>
                <h3>Observações do Alimento:</h3>
                <textarea
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    style={{
                        width: "100%",
                        height: "80px",
                        padding: "10px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
                />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
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

            </div>
            <QN_PopUp
                isPopUpOpen={openPopUp}
                setPopUpOpen={setOpenPopUp}
                styleConfig={{
                    windowConfig: {
                        width: '90%',
                        height: '90%',
                    },
                    bodyConfig: {
                        content: (
                            <>
                                <AlimentPage />
                            </>
                        )
                    }
                }}
            />
        </div>
    )
}
