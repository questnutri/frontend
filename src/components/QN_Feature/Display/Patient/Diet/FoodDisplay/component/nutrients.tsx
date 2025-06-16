import { BsFire } from '@/icons'
import { useFood } from '../context'
import { useEffect, useState } from 'react'
import { Divider } from '@nextui-org/react'
import { Food } from '@/utils/interfaces/Diet.interfaces'

export default function FoodDisplay_Nutrients({ foodPassed }: { foodPassed?: Food }) {
    const { food } = useFood()
    const [nutrients, setNutrients] = useState({
        kcal: 0,
        carb: 0,
        protein: 0,
        fat: 0,
    })

    const parseNumber = (val: string) => parseFloat(val.replace(',', '.'))

    useEffect(() => {
        if (foodPassed?.aliment && foodPassed?.quantity) {
            const quantity = Number(foodPassed.quantity) || 0
            const aliment = foodPassed.aliment

            setNutrients({
                kcal: (quantity * parseNumber(aliment.kcal || '0')) / 100,
                carb: (quantity * parseNumber(aliment.carb || '0')) / 100,
                protein: (quantity * parseNumber(aliment.protein || '0')) / 100,
                fat: (quantity * parseNumber(aliment.fat || '0')) / 100,
            })
        }
    }, [foodPassed])

    return (
        <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center', gap: '20px', height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center' }}>
                <span style={{ fontSize: '13px' }}>
                    {nutrients.kcal.toFixed(2)} kcal
                </span>
                <BsFire size={'20px'} color='#55b7fe' style={{ marginLeft: '5px' }} />
            </div>
            <Divider orientation='vertical' />
            <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center', gap: '20px' }}>
                <span style={{ fontSize: '13px' }}>
                    Carb.: {nutrients.carb.toFixed(2)}g
                </span>
                <span style={{ fontSize: '13px' }}>
                    Prot.: {nutrients.protein.toFixed(2)}g
                </span>
                <span style={{ fontSize: '13px' }}>
                    Gord.: {nutrients.fat.toFixed(2)}g
                </span>
            </div>
        </div>
    )
}
