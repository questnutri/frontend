import QN_CheckBoxGroup from "@/components/QN_Components/QN_CheckBoxGroup"
import QN_SectionDivider from "@/components/QN_Components/QN_SectionDivider"
import { DayOfWeek } from "@/models/Patient/Diet/Diet.interface"
import { useMealDisplay } from "../context"
import { useMeal } from "@/context/diet.context"

export function MealDisplay_DaysOfWeek() {
    const { isEditable } = useMealDisplay()
    const { mealChanges, handleMealChange } = useMeal()

    const daysOfWeek = [
        { value: 'Sunday', label: 'D' },
        { value: 'Monday', label: 'S' },
        { value: 'Tuesday', label: 'T' },
        { value: 'Wednesday', label: 'Q' },
        { value: 'Thursday', label: 'Q' },
        { value: 'Friday', label: 'S' },
        { value: 'Saturday', label: 'S' }
    ]

    return (
        <QN_SectionDivider
            title='Dias da semana'
            sectionPadding='0px 20px'
            styleConfig={{
                dividerConfig: {
                    bottomDistance: '0px'
                },
                bottomLine: {
                    active: true,
                    topDistance: '18px'
                }
            }}
        >
            <div style={{ padding: '0px 30px' }}>
                <QN_CheckBoxGroup
                    label={""}
                    value={mealChanges?.daysOfWeek}
                    items={daysOfWeek}
                    onChange={(selected) => handleMealChange('daysOfWeek', [...selected] as DayOfWeek[])}
                    itemLabelPosition='above'
                    itemLabelMarginLeft='-8px'
                    disabled={!isEditable}
                    justifyContent='space-between'
                />
            </div>
        </QN_SectionDivider>
    )
}