'use client'
import { useState } from 'react'
import { BiSolidRightArrow, BiSolidDownArrow } from '../../../icons/index'
import QN_Input from '../QN_Input'
import QN_MealViewerProvider, { useMealViewer } from './context'
import QN_MealViewer_Component from './component'
import { useMeal } from '@/context/diet.context'

interface QN_MealProps {
    _id: string
    aliment: string
    kcal: string
    quantity: number
    unityOt: string
}

export default function QN_DietDisplay_Meal() {
    return (
        <QN_MealViewerProvider>
            <QN_MealViewer_Component />
        </QN_MealViewerProvider>
    )
}