'use client'
import { useState } from 'react'
import { BiSolidRightArrow, BiSolidDownArrow, FaRegClock, BsFire, FaRegTrashCan } from '../../icons/index'
import QN_Input2 from '../QN_Input2'
interface QN_MealProps {
    _id: string
    aliment: string
    kcal: string
    quantity: number
    unityOt: string
}

interface QN_MealViewerProps {
    meal?: QN_MealProps
    role?: string
}

export default function QN_MealViewer({
    meal,
    role
}: QN_MealViewerProps) {

    const [isHovered, setIsHovered] = useState(false)
    const [openMoreInformation, setOpenMoreInformation] = useState(false)
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '90%'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'start',
                        justifyContent: 'start',
                        width: '100%',
                        backgroundColor: 'white',
                        borderRadius: openMoreInformation ? '5px 5px 0px 0px' : '5px',
                        minHeight: '30px',
                        height: 'fit-content',
                        padding: '0px 10px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'start',
                            gap: '10px',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => setOpenMoreInformation(!openMoreInformation)}
                    >
                        <div>
                            {openMoreInformation ? (
                                <BiSolidDownArrow color='#55b7fe' size={'20px'} />
                            ) : (
                                <BiSolidRightArrow color='#55b7fe' size={'20px'} />
                            )}
                        </div>
                        <div
                            style={{
                                marginTop: '4px'
                            }}
                        >
                            <QN_Input2
                                value='Teste'
                                onChange={() => undefined}
                                removeStyle={role === 'nutritionist' ? false : true}
                                fontSize='text-lg'
                                fontWeight='font-bold'
                                cursor={isHovered}
                                color='#55b7fe'
                            />
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '70%',
                            height: '100%'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%'
                            }}
                        >
                            <FaRegClock size={'20px'} color='#55b7fe' />
                            <span
                                style={{
                                    width: '100%',
                                    marginTop: '4px'
                                }}
                            >
                                <QN_Input2
                                    width='fit-content'
                                    removeStyle={true}
                                    value='24:00'
                                    fontWeight='font-bold'
                                    color='#55b7fe'
                                    type='time'
                                    onChange={() => null}
                                />
                            </span>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%'
                            }}
                        >
                            <BsFire size={'20px'} color='#55b7fe' />
                            <span
                                style={{
                                    width: '100%',
                                    marginTop: '4px'
                                }}
                            >
                                <QN_Input2
                                    width='fit-content'
                                    removeStyle={true}
                                    value={`9999 kcal`}
                                    fontWeight='font-bold'
                                    color='#55b7fe'
                                    onChange={() => null}
                                />
                            </span>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%'
                            }}
                        >
                            <FaRegTrashCan size={'20px'} color='#55b7fe' />
                            <span
                                style={{
                                    width: '100%',
                                    marginTop: '4px'
                                }}
                            >
                                <QN_Input2
                                    width='fit-content'
                                    removeStyle={true}
                                    value='24:00'
                                    fontWeight='font-bold'
                                    color='#55b7fe'
                                    onChange={() => null}
                                />
                            </span>
                        </div>

                    </div>

                </div>
                <div
                    style={{
                        display: openMoreInformation ? 'flex' : 'none',
                        width: '100%',
                        height: '300px',
                        backgroundColor: 'white',
                        borderRadius: '0px 0px 5px 5px'
                    }}
                >

                </div>
            </div>
            <div
                style={{
                    minWidth: '4%',
                    width: 'fit-content',
                    maxWidth: '10%',
                    height: '100%',
                    backgroundColor: '#494a4a',
                    borderRadius: '0px 5px 5px 0px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h2
                    style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: 'white'
                    }}
                >2XP</h2>
            </div>
        </div>
    )
}