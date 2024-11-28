'use client'
import QN_Input from "@/components/QN_Components/QN_Input"
import { useFood } from "../context"
import QN_DropDown from "@/components/QN_Components/QN_DropDown"
import { useState } from "react"

export default function FoodDisplay_Info() {
    const { food, isFoodEditable } = useFood()

    const [selectedUnit, setSelectedUnit] = useState("grams")
    const [quantity, setQuantity] = useState(food?.quantity)

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div style={{ marginTop: '10px' }}>
                <QN_Input
                    value={`${quantity}`}
                    onChange={(e) => {
                        setQuantity(Number(e.target.value))
                    }}
                    cursor='default'
                    backgroundColor={isFoodEditable ? '#fff' :'#EAEAEA'}
                    removeStyle={!isFoodEditable}
                    width='70px'
                    type="number"
                />
            </div>

            <div style={{marginBottom: '8px'}}>
                <QN_DropDown
                    items={[{
                        label: 'g',
                        value: 'grams',
                    }]}
                    value={selectedUnit}
                    onChange={(selected) => setSelectedUnit(selected)}
                    disabled={!isFoodEditable}
                    buttonConfig={{
                        width: '10px',
                        textAlignX: 'start',
                    }}
                    optionsConfig={{
                        width: '50%',
                    }}
                />
            </div>

        </div>
    )
}