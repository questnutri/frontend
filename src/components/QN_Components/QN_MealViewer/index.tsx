'use client'
import QN_MealViewerProvider from './context'
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