import { daysOfWeekBR, daysOfWeekEN } from "../../Nutritionist/NutritionistPatient/DietDisplay"
import { useDietDisplay } from "../../Nutritionist/NutritionistPatient/DietDisplay/contex"
import QN_DietDisplay_Meal from "../QN_DietDisplay_Meal"
import { BiSolidLeftArrow, BiSolidRightArrow } from '../../../icons'
import { MealContextProvider, useDiet } from "@/context/diet.context"
import { DayOfWeek } from "@/models/Patient/Diet/Diet.interface"
import { useState } from "react"

interface QN_DietDisplay_DayProps {
    day: number
}

export default function QN_DietDisplay_Day({ day }: QN_DietDisplay_DayProps) {
    const { diet, meals } = useDiet()
    const { expandedDay, toggleExpandedDay } = useDietDisplay()

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
                    overflow: expandedDay === day ? 'auto' : 'hidden',
                    alignItems: 'center',

                    //NÃO MEXER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    width: '100%', //FAZ OS DIAS DA SEMANA OCUPAREM PROPORCIONALMENTE OS DIAS DA SEMANA
                    minWidth: expandedDay === day ? '100%' : '0px', //FAZ O DIA SELECIONADO EXPANDIR E O RESTO RETRAIR
                    transition: expandedDay === day //FAZ A ANIMAÇÃO DA EXPANSÃO
                        ? 'min-width 0.4s ease-out'  // velocidade ao expandir
                        : 'min-width 0.5s ease-out', // velocidade ao retrair
                    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                }}
            // style={{
            //     display: 'flex',
            //     overflow: 'hidden',
            //     flexDirection: 'column',
            //     justifyContent: 'start',
            //     alignItems: 'center',
            //     width: '100%',
            //     minWidth: expandedDay === day ? '100%' : '0px',
            //     padding: (expandedDay === day || expandedDay == null) ? '20px 10px' : '0px',

            //     borderRadius: '15px',
            //     gap: '10px',
            //     
            // }}
            >


                {(expandedDay == null || expandedDay === day) && (
                    <>
                        <div style={{
                            display: 'flex',
                            justifyContent: expandedDay == day ? 'space-between' : 'center',
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
                                    paddingBottom: '100px',
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

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',


                            gap: '10px',//DISTÂNCIA ENTRE OS CARDS

                            width: '100%', //FAZ OS CARDS DAS REFEIÇÕES OCUPAREM 100% DA LARGURA
                            height: '100%', //FAZ OS CARDS DAS REFEIÇÕES OCUPAREM PROPORCIONALMENTE A ALTURA
                        }}>
                            {
                                diet?.meals?.map((meal, index) => {
                                    if (meal.daysOfWeek.includes(daysOfWeekEN[day] as DayOfWeek))
                                        return (
                                            <MealContextProvider key={meal._id} mealIndex={index}>
                                                <QN_DietDisplay_Meal key={`${meal._id}`} />
                                            </MealContextProvider>

                                        )
                                })
                            }
                        </div>
                    </>
                )}
            </div>

        </>
    )
}
