
import { useDietDisplay } from '@/context/display/diet.display.context'
import { BiSolidLeftArrow, BiSolidRightArrow } from '@/icons'
import { MealContextProvider, useDiet } from "@/context/diet.context"
import { DayOfWeek } from "@/models/Patient/Diet/Diet.interface"
import { useEffect, useState } from "react"
import DietDisplay_Meal_Provider from "../MealDisplay/context"
import MealDisplay_Component from "../MealDisplay/component"
import { useNutritionistPatient } from "@/context/modal.patient.context"
import QN_Button from "@/components/QN_Components/QN_Button"
import { daysOfWeekBR, daysOfWeekEN } from '@/components/QN_Feature/Display/Patient/Diet/DietDisplay'
import { createPatientMeal } from '@/lib/Diet/diet.api'
import QN_ConditionalRender from '@/components/QN_Components/QN_ConditionalRender'
import { usePopUpGlobal } from '@/components/QN_Components/QN_PopUp/popup.global.context'

interface QN_DietDisplay_DayProps {
    day: number
}

export default function QN_DietDisplay_Day({ day }: QN_DietDisplay_DayProps) {
    const { patient, fetchPatient } = useNutritionistPatient()
    const { diet, meals } = useDiet()
    const { expandedDay, toggleExpandedDay } = useDietDisplay()
    const { showPopUp } = usePopUpGlobal()

    const handleCreateMeal = async () => {

        const data = await createPatientMeal(patient!._id, diet!._id, {
            name: 'Refeição',
            hour: '00:00',
            daysOfWeek: [daysOfWeekEN[day] as DayOfWeek]
        })
        if (data.status == 201) {
            showPopUp({
                windowConfig: {
                    width: '250px'
                },
                titleConfig: {
                    title: 'Sucesso!'
                },
                bodyConfig: {
                    content: 'Nova refeição criada'
                },
                defaultButtons: {
                    okButton: true
                }
            })
            await fetchPatient()
        } else {
            showPopUp({
                windowConfig: {
                    width: '250px'
                },
                titleConfig: {
                    title: 'Erro'
                },
                bodyConfig: {
                    content: 'Houve um erro ao tentar criar sua refeição. Tente novamente.'
                },
                defaultButtons: {
                    okButton: true
                }
            })
        }

    }

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
                                        <MealDisplay_Component day={day}/>
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
                    height: '100%',
                    boxSizing: 'border-box',
                    overflow: 'hidden',

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
                            overflow: 'none',
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
                            <QN_ConditionalRender
                                nutritionist={
                                    <div
                                        style={{ width: '100%', paddingBottom: '25px', }}
                                    >
                                        <QN_Button
                                            colorStyle='white'
                                            width='150px'
                                            height='30px'
                                            onClick={handleCreateMeal}
                                            noShadow
                                        >
                                            Nova Refeição
                                        </QN_Button>
                                    </div>
                                }
                            />

                        )}

                        <div style={{
                            display: expandedDay == day ? 'grid' : 'flex',
                            flexDirection: 'column',
                            overflowY: 'auto',
                            gap: '10px',//DISTÂNCIA ENTRE OS CARDS
                            width: '100%', //FAZ OS CARDS DAS REFEIÇÕES OCUPAREM 100% DA LARGURA
                            height: 'auto', //FAZ OS CARDS DAS REFEIÇÕES OCUPAREM PROPORCIONALMENTE A ALTURA
                            scrollbarWidth: 'thin', // Para Firefox
                            scrollbarColor: ' #f1f1f1 #55B7FE', // Para Firefox: cor da barra e do fundo
                            padding: '0px 5px',
                            boxSizing: 'border-box',
                        }}>
                            {renderedContent}
                        </div>
                    </>
                )}
            </div>

        </>
    )
}
