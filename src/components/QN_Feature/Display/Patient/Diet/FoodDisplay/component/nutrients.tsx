import { BsFire, GiMeat } from '@/icons'
import { useFood } from '../context'
import { useState } from 'react'
import { Divider } from '@nextui-org/react'

export default function FoodDisplay_Nutrients() {
    const { food } = useFood()
    const [nutrients, setNutrients] = useState({
        kcal: 0,
        carb: 0,
        protein: 0,
        fat: 0,
    })

    return (
        <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center', gap: '20px', height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center' }}>
                <span style={{ fontSize: '13px' }}>
                    {nutrients.kcal} kcal
                </span>
                <BsFire size={'20px'} color='#55b7fe' style={{ marginLeft: '5px' }} />
            </div>
            <Divider orientation='vertical' />

            <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center', gap: '20px' }}>
                <span style={{ fontSize: '13px' }}>
                    Carb.: {nutrients.carb}g
                </span>
                <span style={{ fontSize: '13px' }}>
                    Prot.: {nutrients.protein}g
                </span>
                <span style={{ fontSize: '13px' }}>
                    Gord.: {nutrients.fat}g
                </span>
            </div>
        </div>
    )
}