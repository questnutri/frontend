import QN_DietDisplay_Day from "@/components/QN_Components/QN_DietDisplay_Day"
import { DietDisplayContext } from "./contex"
import { useEffect, useState } from "react"
import { DietContext } from "@/context/diet.context"
import { IDiet, IMeal } from "@/models/Patient/Diet/Diet.interface"
import { useNutritionistPatient } from "@/context/modal.patient.context"

export const daysOfWeekBR = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
export const daysOfWeekEN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function QN_NutritionistPatient_DietPage() {
    const {patient} = useNutritionistPatient()
    const [diet, setDiet] = useState<IDiet | null>(null)
    const [expandedDay, setExpandedDay] = useState<number | null>(null)
    const [meals, setMeals] = useState<IMeal[] | null>()

    const toggleExpandedDay = (day: number) => {
        if (day == expandedDay) {
            setExpandedDay(null)
        } else {
            setExpandedDay(day)
        }
    }

    useEffect(() => {
        setDiet(patient?.diets?.at(0))
        setMeals(patient?.diets?.at(0)?.meals)
    }, [diet])

    return (
        <>
            <div style={{ height: '5%' }}>
                {diet?.name || 'Sem dieta'}
            </div>
            <div
                style={{ //CONTROLA A DISTÂNCIA ENTRE OS DIAS DA SEMANA!!!
                    backgroundColor: 'red',
                    display: 'flex', //FAZ FICAR DO LADO
                    width: '100%',
                    height: '95%',
                    gap: (expandedDay == null) ? '20px' : '0px', //DISTÂNCIA ENTRE OS DIAS DA SEMANA
                    transition: expandedDay == null
                        ? 'gap 0.3s ease-out'  // velocidade ao expandir
                        : 'gap 0.4s ease-in', // velocidade ao retrair
                    padding: '20px' //PADDING DOS DIAS DA SEMANA!!
                }}
            >

                <DietContext.Provider value={{diet, setDiet, meals}}>
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