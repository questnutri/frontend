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
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px', marginRight: isFoodEditable ? '40px' : '' }}>
            {isFoodEditable ? (
                <>
                    <div style={{ marginTop: '10px' }}>
                        <QN_Input
                            value={`${quantity}`}
                            onChange={(e) => {
                                setQuantity(Number(e.target.value))
                            }}
                            cursor='default'
                            backgroundColor={isFoodEditable ? '#fff' : '#EAEAEA'}
                            removeStyle={!isFoodEditable}
                            width='fit-content'
                            type="number"
                            version={3}
                            unity={true}
                        />
                    </div>

                    <div style={{
                        marginBottom: '8px'
                    }}>
                        <QN_DropDown
                            items={
                                [{
                                    value: 'g',
                                    label: 'grams',
                                },
                                {
                                    value: 'Kg',
                                    label: 'Kilograms'
                                }]
                            }
                            value={selectedUnit}
                            onChange={(selected) => setSelectedUnit(selected)}
                            disabled={!isFoodEditable}
                            buttonConfig={{
                                width: '10px',
                                textAlignX: 'center',
                                backgroundColor: isFoodEditable ? 'white' : ''
                            }}
                            optionsConfig={{
                                width: '20px',

                            }}
                            gapLabel="15px"
                        />
                    </div>
                </>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        gap: '5px',
                        fontSize: '13px',
                        fontWeight: '400',
                        color: 'black',
                        width: 'fit-content'
                    }}
                >
                    <h1>{quantity}</h1>
                    <h1>{selectedUnit}</h1>
                </div>
            )}


        </div >
    )
}