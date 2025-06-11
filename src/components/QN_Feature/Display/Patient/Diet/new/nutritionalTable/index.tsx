import React from "react"
import { IAliment } from "@/models/Aliment.interface"

interface NutricionalTableProps {
  aliment: IAliment | null
  quantity?: number
  unit?: string
}

export default function NutricionalTable({ aliment, quantity = 100, unit = "g" }: NutricionalTableProps) {
  const formatValue = (value?: string | number, factor = 1): string | null => {
    if (value === undefined || value === null) return null
    if (typeof value === "string" && value.trim() === "") return null
    const normalized = typeof value === "string" ? value.replace(",", ".") : value.toString()
    const num = Number(normalized)
    if (isNaN(num)) return null
    return (num * factor).toFixed(2)
  }

  if (!aliment) {
    return <div>Nenhum alimento selecionado.</div>
  }

  const rows = [
    { label: "Valor energético", key: "kcal", unit: "kcal" },
    { label: "Carboidratos", key: "carb", unit: "g" },
    { label: "Proteínas", key: "protein", unit: "g" },
    { label: "Gorduras Totais", key: "fat", unit: "g" },
    { label: "Fibra Alimentar", key: "dietaryFiber", unit: "g" },
    { label: "Sódio", key: "sodium", unit: "mg" }
  ]

  return (
    <div style={{ marginBottom: "20px", border: "1px solid #ccc", borderRadius: "4px", padding: "10px" }}>
      <h3 style={{ marginBottom: "10px" }}>Informações Nutricionais:</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>Nutriente</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>Referência (100g)</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>Quantidade ({quantity} {unit})</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ label, key, unit }) => {
            const refValue = formatValue(aliment[key as keyof IAliment])
            if (refValue === null) return null
            const realValue = formatValue(aliment[key as keyof IAliment], quantity / 100)
            return (
              <tr key={key}>
                <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>{label}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>{refValue} {unit}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>{realValue} {unit}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
