import { useState } from "react"

export default function AlimentoPrincipal() {
    const [alimento, setAlimento] = useState("")
    const [quantidade, setQuantidade] = useState<number | null>(null)
    const [unidade, setUnidade] = useState("")
    const [observacoes, setObservacoes] = useState("")

    const handleSave = () => {
        console.log("Salvar informações", { alimento, quantidade, unidade, observacoes })
    }

    return (
        <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <h1 style={{ fontSize: "24px" }}>Alimento Principal</h1>
                <button style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: "18px" }}>
                    🗑️
                </button>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                    marginBottom: "20px",
                }}
            >
                <input
                    type="text"
                    placeholder="(Alimento Atual)"
                    value={alimento}
                    onChange={(e) => setAlimento(e.target.value)}
                    style={{
                        flex: 1,
                        padding: "10px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
                />
                <input
                    type="number"
                    placeholder="{quantidade}"
                    value={quantidade || ""}
                    onChange={(e) => setQuantidade(Number(e.target.value))}
                    style={{
                        width: "120px",
                        padding: "10px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
                />
                <input
                    type="text"
                    placeholder="{unidade}"
                    value={unidade}
                    onChange={(e) => setUnidade(e.target.value)}
                    style={{
                        width: "120px",
                        padding: "10px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
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
        </div>
    )
}
