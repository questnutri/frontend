import QN_DietDisplay_Day from "@/components/QN_Feature/Display/Patient/Diet/DayDisplay"
import { DietDisplayContext } from "@/context/display/diet.display.context"
import { useEffect, useState } from "react"
import { DietContext } from "@/context/diet.context"
import { IDiet, IMeal } from "@/models/Patient/Diet/Diet.interface"
import { useNutritionistPatient } from "@/context/modal.patient.context"
import { useUser } from "@/context/user.context"

export const daysOfWeekBR = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
export const daysOfWeekEN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function QN_NutritionistPatient_DietPage() {
    const { role } = useUser()
    const { patient } = useNutritionistPatient()
    const [diet, setDiet] = useState<IDiet | null>(null)
    const [expandedDay, setExpandedDay] = useState<number | null>(null)
    const [meals, setMeals] = useState<IMeal[] | null>([])

    const toggleExpandedDay = (day: number) => {
        if (day == expandedDay) {
            setExpandedDay(null)
        } else {
            setExpandedDay(day)
        }
    }

    //Updates diet when modalPatient is load
    useEffect(() => {
        setDiet(patient?.diets?.at(0))
    }, [patient])

    //Updates meals array when diet is load
    useEffect(() => {
        setMeals(patient?.diets?.at(0)?.meals || [])
    }, [diet])


    useEffect(() => {
        if (role === 'patient') {
            toggleExpandedDay(new Date().getDay())
        }
    }, [])


    return (
        <>
            <div
                style={{ //CONTROLA A DISTÂNCIA ENTRE OS DIAS DA SEMANA!!!
                    display: 'flex', //FAZ FICAR DO LADO
                    width: '100%',
                    height: '100%',
                    gap: (expandedDay == null) ? '20px' : '0px', //DISTÂNCIA ENTRE OS DIAS DA SEMANA
                    transition: expandedDay == null
                        ? 'gap 0.3s ease-out'  // velocidade ao expandir
                        : 'gap 0.4s ease-in', // velocidade ao retrair
                    padding: '20px' //PADDING DOS DIAS DA SEMANA!!
                }}
            >
                <DietContext.Provider value={{ diet, setDiet, meals, setMeals }}>
                    <DietDisplayContext.Provider value={{ expandedDay, toggleExpandedDay }}>
                        <QN_DietDisplay_Day day={0} />
                        <QN_DietDisplay_Day day={1} />
                        <QN_DietDisplay_Day day={2} />
                        <QN_DietDisplay_Day day={3} />
                        <QN_DietDisplay_Day day={4} />
                        <QN_DietDisplay_Day day={5} />
                        <QN_DietDisplay_Day day={6} />
                    </DietDisplayContext.Provider>
                </DietContext.Provider>
            </div>
        </>

    )
}