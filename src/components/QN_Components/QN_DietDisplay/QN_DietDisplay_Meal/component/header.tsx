'use client'
import { BiSolidRightArrow, BsFire, FaCopy, FaRegClock } from '@/icons'
import QN_Input from "@/components/QN_Components/QN_Input"
import { useUser } from "@/context/user.context"
import { MdEdit } from "react-icons/md"
import { FaTrash } from "react-icons/fa6"
import QN_ConditionalRender from "@/components/QN_Components/QN_ConditionalRender"
import { use, useEffect, useState } from "react"
import QN_Button from "@/components/QN_Components/QN_Button"
import { usePopUpGlobal } from "@/components/QN_Components/QN_PopUp/popup.global.context"
import { useDiet, useMeal } from "@/context/diet.context"
import { useNutritionistPatient } from "@/context/modal.patient.context"
import { updatePatientMeal } from "@/lib/fetchPatients"
import QN_SectionDivider from "@/components/QN_Components/QN_SectionDivider"
import QN_CheckBoxGroup from "@/components/QN_Components/QN_CheckBoxGroup"
import { useMealDisplay } from '../context'
import { DayOfWeek } from '@/models/Patient/Diet/Diet.interface'
import { duplicatePatientMeal } from '@/lib/Diet/diet.api'
import { useModal } from '@/components/QN_Components/QN_Modal/modal.context'
import QN_Modal from '@/components/QN_Components/QN_Modal'
import { Divider } from '@nextui-org/react'

export default function DietDisplay_Meal_Header_Expanded({ inputSize }: { inputSize?: string }) {
    const { role } = useUser()

    const { patient, fetchPatient } = useNutritionistPatient()
    const { diet } = useDiet()
    const { meal } = useMeal()

    const { isOpened, setIsOpened, toggleOpened, isEditable, setIsEditable, toggleEditable } = useMealDisplay()
    const { showPopUp } = usePopUpGlobal()


    const [mealInput, setMealInput] = useState(meal?.name || 'Refeição')
    const [hourInput, setHourInput] = useState(meal?.hour || '00:00')

    const handleSave = async () => {
        updatePatientMeal(patient!._id, diet!._id, meal!._id, {
            name: mealInput,
            hour: hourInput,
            daysOfWeek: meal?.daysOfWeek
        })
        toggleEditable()
        if (meal) {
            meal.name = mealInput as string
            meal.hour = hourInput as string
        }

        await fetchPatient()
    }

    const handleCancel = () => {
        toggleEditable()
        setMealInput(meal?.name || '')
        setHourInput(meal?.hour || '00:00')
    }


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
                    onChange={(selected) => {
                        setSelectedValues(selected as DayOfWeek[])
                    }}
                    itemLabelPosition='above'
                    itemLabelMarginLeft='-8px'
                    justifyContent='space-between'
                />
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '30px' }}>
                    <QN_Button colorStyle='red' onClick={closeModal}>Cancelar</QN_Button>
                    <QN_Button
                        onClick={
                            async () => {
                                await duplicatePatientMeal(patient!._id, diet!._id, {
                                    name: meal?.name,
                                    hour: meal?.hour,
                                    daysOfWeek: selectedValues,
                                })
                                await fetchPatient()
                                closeModal()
                                showPopUp({
                                    message: 'Refeição duplicada!',
                                    width: '300px',
                                    okButton: true,
                                })
                            }}
                    >Duplicar</QN_Button>
                </div>
            </div>
        )
    }
    const handleDuplicate = async () => {
        showPopUp({
            title: 'Duplicar refeição nos dias:',
            message: (
                <>
                    <Duplicate />
                </>
            ),
        })


    }

    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                cursor: 'default',
                alignItems: 'center',
                height: '50px',
                padding: '10px 15px',
                gap: '15px'
            }}
        >
            <div
                onClick={toggleOpened}
                style={{
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease',
                    transform: isOpened ? 'rotate(90deg)' : 'rotate(0deg)',
                    transformOrigin: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50px',
                }}
            >
                <BiSolidRightArrow color='#55b7fe' size={'20px'} />
            </div>

            <div style={{ flex: 1, maxWidth: inputSize || '70%', cursor: 'pointer' }} onClick={() => { if (!isEditable) toggleOpened() }}>
                <QN_Input
                    value={mealInput}
                    onChange={(e) => setMealInput(e.target.value)}
                    removeStyle={!isEditable}
                    fontSize='text-lg'
                    fontWeight='font-bold'
                    color='#55b7fe'
                    height='50px'
                />
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                height: '50px',
                padding: '0px 8px 0px 0px',
            }}>
                <QN_Input
                    width='120px'
                    height='100%'
                    removeStyle={!isEditable}
                    value={hourInput}
                    fontSize='20px'
                    fontWeight='font-bold'
                    color='#55b7fe'
                    type='time'
                    onChange={(e) => setHourInput(e.target.value)}
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
            <Divider orientation='vertical'/>
            <QN_ConditionalRender
                nutritionist={
                    <>
                        {isEditable ? (
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <QN_Button
                                    onClick={handleSave}
                                    height='25px'
                                    width='10px'
                                    borderRadius='4px'
                                    fontSize='12px'
                                >
                                    Salvar
                                </QN_Button>
                                <QN_Button
                                    onClick={handleCancel}
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
                                className='hover-icon'
                                onMouseEnter={(e) => (e.currentTarget.style.color = '#494a4a')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = '#55b7fe')}
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
                            className='hover-icon'
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#494a4a')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = '#55b7fe')}
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
                            className='hover-icon'
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#494a4a')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = '#55b7fe')}
                            onClick={() => {
                                showPopUp({
                                    title: 'Você deseja mesmo excluir essa refeição?',
                                    width: '300px',
                                    customButtons: [
                                        {
                                            text: 'Excluir',
                                            colorStyle: 'red',
                                        },
                                        {
                                            text: 'Não excluir',
                                            colorStyle: 'blue'
                                        }
                                    ]
                                })
                            }}
                        />

                    </>
                }
            />
        </div>
    )
}

export function MealDisplay_DaysOfWeek() {
    const { isEditable } = useMealDisplay()
    const { meal } = useMeal()
    const [selectedValues, setSelectedValues] = useState(meal?.daysOfWeek)

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
        <QN_SectionDivider title='Dias da semana' sectionPadding='0px 20px' endLine>
            <div style={{ padding: '0px 30px' }}>
                <QN_CheckBoxGroup
                    label={""}
                    value={selectedValues}
                    items={daysOfWeek}
                    onChange={(selected) => {
                        setSelectedValues(selected as DayOfWeek[])
                        if (meal) {
                            meal!.daysOfWeek = selected as DayOfWeek[]
                        }
                    }}
                    itemLabelPosition='above'
                    itemLabelMarginLeft='-8px'
                    disabled={!isEditable}
                    justifyContent='space-between'
                />
            </div>
        </QN_SectionDivider>
    )
}