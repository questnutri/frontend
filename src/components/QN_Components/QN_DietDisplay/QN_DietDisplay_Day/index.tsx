import { daysOfWeekBR, daysOfWeekEN } from "../../../Nutritionist/NutritionistPatient/DietDisplay"
import { useDietDisplay } from "../../../Nutritionist/NutritionistPatient/DietDisplay/contex"
import { BiSolidLeftArrow, BiSolidRightArrow } from '../../../../icons'
import { MealContextProvider, useDiet } from "@/context/diet.context"
import { DayOfWeek } from "@/models/Patient/Diet/Diet.interface"
import { useEffect, useState } from "react"
import DietDisplay_Meal_Provider from "../QN_DietDisplay_Meal/context"
import MealDisplay_Component from "../QN_DietDisplay_Meal/component"
import { useNutritionistPatient } from "@/context/modal.patient.context"
import QN_Button from "../../QN_Button"

interface QN_DietDisplay_DayProps {
    day: number
}

export default function QN_DietDisplay_Day({ day }: QN_DietDisplay_DayProps) {
    const { patient, fetchPatient } = useNutritionistPatient()
    const { diet, meals } = useDiet()
    const { expandedDay, toggleExpandedDay } = useDietDisplay()

    //render meals when diet is updated
    const [renderedContent, setRenderedContent] = useState(<></>)
    useEffect(() => {
        setRenderedContent(
            <>
                {
                    diet?.meals?.map((meal, index) => {
                        if (meal.daysOfWeek.includes(daysOfWeekEN[day] as DayOfWeek))
                            return (
                                <MealContextProvider key={meal._id} refDay={day} mealIndex={index}>
                                    <DietDisplay_Meal_Provider>
                                        <MealDisplay_Component />
                                    </DietDisplay_Meal_Provider>
                                </MealContextProvider>

                            )
                    })
                }
            </>)
    }, [patient, diet, meals])

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#55B7FE',
                    padding: (expandedDay === day || expandedDay == null) ? '15px' : '0px',
                    borderRadius: '15px',
                    justifyContent: 'start',
                    alignItems: 'center',

                    //NÃO MEXER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    width: '100%', //FAZ OS DIAS DA SEMANA OCUPAREM PROPORCIONALMENTE OS DIAS DA SEMANA
                    minWidth: expandedDay === day ? '100%' : '0px', //FAZ O DIA SELECIONADO EXPANDIR E O RESTO RETRAIR
                    transition: expandedDay === day //FAZ A ANIMAÇÃO DA EXPANSÃO
                        ? 'min-width 0.4s ease-out'  // velocidade ao expandir
                        : 'min-width 0.5s ease-out', // velocidade ao retrair
                    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                }}
            >


                {(expandedDay == null || expandedDay === day) && (
                    <>
                        <div style={{
                            display: 'flex',
                            justifyContent: expandedDay == day ? 'space-between' : 'center',
                            overflow: 'hidden',
                            boxSizing: 'border-box',

                            width: '100%'
                        }}>
                            {expandedDay == day && (
                                <BiSolidLeftArrow
                                    size='20px'
                                    color='white'
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => toggleExpandedDay((day - 1 + 7) % 7)}
                                />
                            )}
                            <h1
                                style={{
                                    color: 'white',
                                    fontWeight: '500',
                                    fontSize: '15px',
                                    cursor: 'pointer',
                                    paddingBottom: '15px',
                                }}
                                onClick={() => toggleExpandedDay(day)}
                            >
                                {daysOfWeekBR[day]}
                            </h1>
                            {expandedDay == day && (
                                <BiSolidRightArrow
                                    size='20px'
                                    color='white'
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => toggleExpandedDay((day + 1) % 7)}
                                />
                            )}
                        </div>
                        {expandedDay == day && (
                            <div
                                style={{ width: '100%', paddingBottom: '20px', boxSizing: 'border-box', overflow: 'hidden', }}
                            >
                                <QN_Button colorStyle='white' width='150px' height='30px' noShadow>Nova Refeição</QN_Button>
                            </div>
                        )}

                        <div style={{
                            display: expandedDay == day ? 'grid' : 'flex',
                            flexDirection: 'column',
                            overflowY: 'auto',
                            gap: '10px',//DISTÂNCIA ENTRE OS CARDS
                            width: '100%', //FAZ OS CARDS DAS REFEIÇÕES OCUPAREM 100% DA LARGURA
                            height: expandedDay == day ? 'auto' : '100%', //FAZ OS CARDS DAS REFEIÇÕES OCUPAREM PROPORCIONALMENTE A ALTURA
                            scrollbarWidth: 'thin', // Para Firefox
                            scrollbarColor: ' #f1f1f1 #55B7FE', // Para Firefox: cor da barra e do fundo
                            paddingRight: '5px',
                            boxSizing: 'border-box'
                        }}>
                            {renderedContent}
                        </div>
                    </>
                )}
            </div>

        </>
    )
}
