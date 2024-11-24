'use client'
import { useMealViewer } from "../context"
import { BiSolidRightArrow, BsFire, FaCopy, FaRegClock } from '../../../../icons'
import QN_Input from "@/components/QN_Components/QN_Input"
import { useUser } from "@/context/user.context"
import { MdEdit } from "react-icons/md"
import { FaTrash } from "react-icons/fa6"
import QN_ConditionalRender from "@/components/QN_Components/QN_ConditionalRender"
import { use, useEffect, useState } from "react"
import QN_Button from "@/components/QN_Components/QN_Button"
import { usePopUpGlobal } from "@/components/QN_Components/QN_PopUp/popup.global.context"
import { useMeal } from "@/context/diet.context"

function HourComponent({
    value,
    onChange,
    isEditable
}: {
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    isEditable: boolean
}
) {
    const { meal } = useMealViewer()
    const [hour, setHour] = useState('00:00')

    return (
        <></>
    )
}

function KcalComponent() {
    return (
        <QN_Input
            width='130px'
            height='100%'
            removeStyle={true}
            value={`9999 kcal`}
            fontWeight='font-bold'
            textAlign='center'
            color='#55b7fe'
            onChange={() => null}
            startContent={
                <BsFire size={'30px'} color='#55b7fe' />
            }
        />
    )
}

export default function QN_MealViewer_Component_Header({ inputSize }: { inputSize?: string }) {
    const { role } = useUser()
    const { meal } = useMeal()
    const { isOpened, toggleOpened } = useMealViewer()
    const { showPopUp } = usePopUpGlobal()

    const [isEditable, setIsEditable] = useState(false)

    const [hourInput, setHourInput] = useState('')

    const handleSave = () => {
        setIsEditable(false)
    }

    const handleCancel = () => {
        setIsEditable(false)
    }

    const toggleEditable = () => {
        setIsEditable(!isEditable)
        if (!isOpened && !isEditable) {
            toggleOpened()
        }
    }

    useEffect(() => {

    }, [])

    const [mealName, setMealName] = useState(meal?.name)

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
                    value={mealName ?? 'Refeição'}
                    onChange={() => undefined}
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
                        <BsFire size={'20px'} color='#55b7fe' style={{ marginLeft: '-10px' }}/>
                    }
                />
            </div>
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
                                onClick={toggleEditable}
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
                                setIsEditable(false)
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