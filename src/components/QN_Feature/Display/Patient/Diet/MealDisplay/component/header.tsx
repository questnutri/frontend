'use client'
import { BiSolidRightArrow, BsFire, FaCopy, FaRegClock } from '@/icons'
import QN_Input from "@/components/QN_Components/QN_Input"
import { useUser } from "@/context/user.context"
import { MdEdit } from "react-icons/md"
import { FaTrash } from "react-icons/fa6"
import QN_ConditionalRender from "@/components/QN_Components/QN_ConditionalRender"
import { useEffect, useState } from "react"
import QN_Button from "@/components/QN_Components/QN_Button"
import { usePopUpGlobal } from "@/components/QN_Components/QN_PopUp/popup.global.context"
import { useDiet, useMeal } from "@/context/diet.context"
import { useNutritionistPatient } from "@/context/modal.patient.context"
import QN_CheckBoxGroup from "@/components/QN_Components/QN_CheckBoxGroup"
import { useMealDisplay } from '../context'
import { DayOfWeek } from '@/models/Patient/Diet/Diet.interface'
import { createPatientMeal, deletePatientMeal } from '@/lib/Diet/diet.api'
import { useModal } from '@/components/QN_Components/QN_Modal/modal.context'
import { Divider } from '@nextui-org/react'
import QN_Checkbox from '@/components/QN_Components/QN_Checkbox'
import { checkMeal } from '@/lib/fetchPatients'

export default function DietDisplay_Meal_Header_Expanded({ day, inputSize }: { day: number, inputSize?: string }) {

    const { role } = useUser()
    const { patient, fetchPatient } = useNutritionistPatient()
    const { diet } = useDiet()
    const { meal, mealChanges, handleMealChange, acceptMealChanges, denyMealChanges } = useMeal()
    const { isOpened, setIsOpened, toggleOpened, isEditable, setIsEditable, toggleEditable } = useMealDisplay()
    const { showPopUp } = usePopUpGlobal()


    function Duplicate() {
        const { closeModal } = useModal()
        const [selectedValues, setSelectedValues] = useState(meal?.daysOfWeek || [])
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
            <div style={{ margin: '0px 25px 20px 25px' }}>
                <QN_CheckBoxGroup
                    label={""}
                    value={selectedValues}
                    items={daysOfWeek}
                    onChange={(selected) => setSelectedValues(selected as DayOfWeek[])}
                    itemLabelPosition='above'
                    itemLabelMarginLeft='-8px'
                    justifyContent='space-between'
                />
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '30px', gap: '10px' }}>
                    <QN_Button colorStyle='red' onClick={closeModal}>Cancelar</QN_Button>
                    <QN_Button
                        onClick={async () => {
                            await createPatientMeal(patient!._id, diet!._id, {
                                name: meal?.name,
                                hour: meal?.hour,
                                daysOfWeek: selectedValues,
                            })
                            await fetchPatient()
                            closeModal()
                            showPopUp({
                                bodyConfig: { content: 'Refeição duplicada!' },
                                windowConfig: { width: '300px' },
                                defaultButtons: { okButton: true }
                            })
                        }}
                    >Duplicar</QN_Button>
                </div>
            </div>
        )
    }

    const handleDuplicate = async () => {
        showPopUp({
            titleConfig: { title: 'Duplicar refeição nos dias:' },
            bodyConfig: { content: <Duplicate /> }
        })
    }

    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                cursor: 'default',
                height: '100%',
                padding: '15px',
                boxSizing: 'border-box',
                alignItems: 'center', // Alinha os itens verticalmente no centro
                gap: '20px', // Espaçamento entre os itens
            }}
        >
            <div
                onClick={toggleOpened}
                style={{
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                    transform: isOpened ? 'rotate(90deg)' : 'rotate(0deg)',
                }}
            >
                <BiSolidRightArrow color='#55b7fe' size={'20px'} />
            </div>

            <div
                style={{
                    flex: 1,
                    maxWidth: inputSize || '70%',
                    cursor: 'pointer',
                }}
                onClick={() => {
                    if (!isEditable) toggleOpened()
                }}
            >
                <QN_Input
                    value={mealChanges?.name || ''}
                    onChange={(e) => handleMealChange('name', e.target.value)}
                    removeStyle={!isEditable}
                    fontSize='text-lg'
                    fontWeight='font-bold'
                    color='#55b7fe'
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                <QN_Input
                    value={mealChanges?.hour || '00:00'}
                    onChange={(e) => handleMealChange('hour', e.target.value)}
                    width='130px'
                    height='100%'
                    removeStyle={!isEditable}
                    fontSize='20px'
                    fontWeight='font-bold'
                    color='#55b7fe'
                    type='time'
                    textAlign='center'
                    endContent={
                        !isEditable && (
                            <FaRegClock size={'20px'} color='#55b7fe' style={{ marginLeft: '-25px' }} />
                        )
                    }
                />
                <QN_Input
                    width='130px'
                    height='100%'
                    removeStyle={true}
                    value={`9999 kcal`}
                    fontWeight='font-bold'
                    textAlign='center'
                    color='#55b7fe'
                    onChange={() => null}
                    endContent={
                        <BsFire size={'20px'} color='#55b7fe' style={{ marginLeft: '-10px' }} />
                    }
                />
            </div>

            <Divider orientation='vertical' />

            <QN_ConditionalRender
                patient={
                    day == new Date().getDay() ? (
                        <div style={{ width: '7%' }}>
                            <QN_Checkbox
                                selected={patient!.dailyMealRecord!.completedToday!.includes(meal!._id)}
                                isDisabled={patient!.dailyMealRecord!.completedToday!.includes(meal!._id)}
                                onChange={async () => { 
                                    await checkMeal(meal!._id) 
                                    await fetchPatient()
                                }}
                            />
                        </div>

                    ) : (<></>)
                }

                nutritionist={
                    <>
                        {isEditable ? (
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <QN_Button
                                    onClick={async () => {
                                        await acceptMealChanges()
                                        toggleEditable()
                                    }}
                                    height='25px'
                                    width='10px'
                                    borderRadius='4px'
                                    fontSize='12px'
                                >
                                    Salvar
                                </QN_Button>
                                <QN_Button
                                    onClick={async () => {
                                        denyMealChanges(toggleEditable)
                                    }}
                                    colorStyle='red'
                                    height='25px'
                                    width='10px'
                                    borderRadius='4px'
                                    fontSize='12px'
                                >
                                    Cancelar
                                </QN_Button>
                            </div>
                        ) : (
                            <MdEdit
                                size={'25px'}
                                color='#55b7fe'
                                style={{
                                    cursor: 'pointer',
                                    transition: 'color 0.3s ease',
                                }}
                                title='Editar'
                                onClick={() => {
                                    setIsOpened(true)
                                    setIsEditable(true)
                                }}
                            />
                        )}
                        <FaCopy
                            size={'20px'}
                            color='#55b7fe'
                            style={{
                                cursor: 'pointer',
                                transition: 'color 0.3s ease',
                            }}
                            title='Duplicar'
                            onClick={handleDuplicate}
                        />
                        <FaTrash
                            size={'20px'}
                            color='#55b7fe'
                            style={{
                                cursor: 'pointer',
                                transition: 'color 0.3s ease',
                            }}
                            title='Excluir'
                            onClick={() => {
                                showPopUp({
                                    titleConfig: {
                                        title: 'Você deseja mesmo excluir essa refeição?'
                                    },
                                    windowConfig: { width: '300px' },
                                    customButtons: {
                                        items: [
                                            {
                                                text: 'Excluir',
                                                colorStyle: 'red',
                                                confirmationTextRequired: 'EXCLUIR',
                                                width: '120px',
                                                onClick: async () => {
                                                    if (patient && diet && meal) {
                                                        const res = await deletePatientMeal(patient!._id, diet!._id, meal!._id)
                                                        if (res.status == 200) {
                                                            showPopUp({
                                                                windowConfig: { width: '200px' },
                                                                titleConfig: { title: 'Refeição excluída' },
                                                                defaultButtons: { okButton: true }
                                                            })
                                                            await fetchPatient()
                                                        } else {
                                                            showPopUp({
                                                                windowConfig: { width: '200px' },
                                                                titleConfig: { title: 'Erro ao excluir a refeição' },
                                                                defaultButtons: { okButton: true }
                                                            })
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                text: 'Cancelar',
                                                onClick: () => null
                                            }
                                        ]
                                    }
                                })
                            }}
                        />
                    </>
                }
            />
        </div>
    )
}
