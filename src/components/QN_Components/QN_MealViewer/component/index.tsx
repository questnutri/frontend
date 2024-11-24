'use client'
import { useDietDisplay } from "@/components/Nutritionist/NutritionistPatient/DietDisplay/contex"
import { useMealViewer } from "../context"
import QN_MealViewer_Component_Header from "./header"
import { useEffect, useState } from "react"
import QN_CheckBoxGroup from "../../QN_CheckBoxGroup"

export default function QN_MealViewer_Component() {
    const { expandedDay } = useDietDisplay()
    const { isOpened, toggleOpened } = useMealViewer()


    const [shownedContent, setShownedContent] = useState(<></>)
    useEffect(() => {
        if (expandedDay != null) {
            setShownedContent(<QN_MealViewer_Component_Header />)
        } else {
            setShownedContent(<></>)
        }
    }, [expandedDay])

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'start',
                width: '100%',
                backgroundColor: 'white',
                borderRadius: '10px',
                overflow: 'hidden',
                transition: 'height 0.3s ease',
                height: expandedDay != null ? (isOpened ? '350px' : '100%') : '100%',
            }}
        >
            {shownedContent}

        </div>
    )
}