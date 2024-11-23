'use client'
import { useState } from 'react'
import { BiSolidRightArrow, BiSolidDownArrow } from '../../icons/index'
import QN_Input2 from '../QN_Input2'
import QN_MealViewerProvider, { useMealViewer } from './context'
import QN_MealViewer_Component from './component'

interface QN_MealProps {
    _id: string
    aliment: string
    kcal: string
    quantity: number
    unityOt: string
}

export default function QN_MealViewer() {
    
    return (
        <QN_MealViewerProvider>
            <QN_MealViewer_Component/>
        </QN_MealViewerProvider>
    )
}