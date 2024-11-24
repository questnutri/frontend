'use client'
import { useDietDisplay } from "@/components/Nutritionist/NutritionistPatient/DietDisplay/contex"
import { useMealViewer } from "../context"
import QN_MealViewer_Component_Header from "./header"
import { useEffect, useState } from "react"
import QN_CheckBoxGroup from "../../QN_CheckBoxGroup"
import { useMeal } from "@/context/diet.context"
import QN_Input from "../../QN_Input"
import QN_TextArea from "../../QN_TextArea"

export default function QN_MealViewer_Component() {
    const { meal } = useMeal()
    const { expandedDay } = useDietDisplay()
    const { isOpened, toggleOpened } = useMealViewer()

    const [shownedContent, setShownedContent] = useState(<></>)
    useEffect(() => {
        if (expandedDay != null) {
            setShownedContent(<QN_MealViewer_Component_Header />)
        } else {
            setShownedContent(
                <>
                    <div>
                        <QN_TextArea
                            value={meal?.name || 'Refeição'}
                            onChange={() => undefined}
                            // removeStyle={true}
                            // textAlign='center'
                            // fontSize='15px'
                            // fontWeight='font-bold'
                            // color='#55b7fe'
                            // height='50px'
                        />
                    </div>
                </>

            )
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