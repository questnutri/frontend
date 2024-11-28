'use client'
import { useDietDisplay } from "@/context/display/diet.display.context"
import { useMealDisplay } from "../context"
import DietDisplay_Meal_Header_Expanded from "./header"
import { useEffect, useState } from "react"
import { useMeal } from "@/context/diet.context"
import QN_TextArea from "@/components/QN_Components/QN_TextArea"
import FoodDisplay from "@/components/QN_Feature/Display/Patient/Diet/FoodDisplay"
import { MealDisplay_DaysOfWeek } from "./dayOfWeek"


export default function MealDisplay_Component() {
    const { meal, refDay, foods } = useMeal()
    const { expandedDay, toggleExpandedDay } = useDietDisplay()
    const { isOpened, setIsOpened, setIsEditable, toggleOpened } = useMealDisplay()

    useEffect(() => {
        if (expandedDay == null) {
            setIsOpened(false)
            setIsEditable(false)
        }
    }, [expandedDay])

    const [renderedContent, setRenderedContent] = useState(<></>)
    useEffect(() => {
        setRenderedContent(
            <>
                {
                    foods?.map((food, index) => {
                        return (
                            <FoodDisplay />
                        )
                    })
                }
            </>)
    }, [expandedDay, meal])

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
                height: expandedDay != null ? (isOpened ? '500px' : '250px') : '100%',
                maxHeight: expandedDay != null ? (isOpened ? '500px' : '55px') : '130px',
                minHeight: '75px',
                transition: 'height 0.3s ease, max-height 0.3s ease',
                boxSizing: 'border-box'
            }}
        >
            {expandedDay != null ? (
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <DietDisplay_Meal_Header_Expanded />
                    {
                        isOpened && (
                            <>
                                <MealDisplay_DaysOfWeek />
                                <div style={{ padding: '20px' }}>
                                    {renderedContent}
                                </div>

                            </>

                        )
                    }

                </div>
            ) : (
                <div>
                    <QN_TextArea
                        value={meal?.name || 'Refeição'}
                        onChange={() => undefined}
                        onClick={() => {
                            toggleExpandedDay(refDay)
                            toggleOpened()
                        }}
                        removeStyle
                        cursor='pointer'
                        textAlign='center'
                    />
                </div>
            )}
        </div>
    )
}