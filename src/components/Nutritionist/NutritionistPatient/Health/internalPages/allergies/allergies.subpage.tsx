'use client'

import QN_DropDown from "@/components/QN_Components/QN_DropDown"
import { QN_PopUp } from "@/components/QN_Components/QN_PopUp"
import QN_Table from "@/components/QN_Components/QN_Table"
import { useNutritionistPatient } from "@/context/modal.patient.context"
import { useEffect, useState } from "react"
import { TbDotsVertical } from '@/icons'
import QN_Button from "@/components/QN_Components/QN_Button"
import MedicineEditablePopUp from "../medicine"
import IAllergies from "@/models/Patient/Health/Allergies.interface"
import AllergiesEditablePopUp from "./allergies.popup"

export default function AllergiesSubpage() {
    const { patient } = useNutritionistPatient()
    const [isAllergiesOpened, setIsAllergiesOpened] = useState(false)
    const [allergiesOpened, setAllergiesOpened] = useState<IAllergies | null>(null)

    const handleEditAction = (row: any) => {
        setAllergiesOpened(row)
    }

    useEffect(() => {
        if (allergiesOpened) {
            setIsAllergiesOpened(true)
        }
    }, [allergiesOpened])

    useEffect(() => {
        if (!isAllergiesOpened) {
            setAllergiesOpened(null)
        }
    }, [isAllergiesOpened])

    const [newAllergiesPopUp, setNewAllergiesPopUp] = useState(false)

    return (
        <div style={{ width: '100%', padding: '15px' }}>
            <div style={{ display: 'flex', padding: '0px 5px 15px', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1
                    style={{ color: '#55B7FE', fontWeight: '600', fontSize: '20px' }}
                >
                    Alergias
                </h1>
                <div style={{}}>
                    <QN_Button
                        width='fit-content'
                        height='30px'
                        borderRadius='5px'
                        onClick={() => setNewAllergiesPopUp(true)}
                    >
                        + Adicionar novo</QN_Button>
                </div>

            </div>

            <QN_Table
                columns={[
                    { key: 'name', label: 'Medicamento' },
                    { key: 'severity', label: 'Gravidade' },
                    { key: 'obs', label: 'Observação' },
                    {
                        key: 'actions',
                        label: 'Ações',
                        render: (value: any, row: any) => (
                            <QN_DropDown
                                items={[
                                    { label: 'Editar', value: 'edit' },
                                    { label: 'Excluir', value: 'delete' },
                                ]}
                                value=""
                                onChange={(action) => {
                                    if (action === 'edit') {
                                        handleEditAction(row)
                                    } else if (action === 'delete') {
                                        console.log('Excluir:', row)
                                    }
                                }}
                                buttonConfig={{
                                    backgroundColor: 'rgba(0, 0, 0, 0)'
                                }}
                                optionsConfig={{
                                    width: '100%',
                                }}
                                replaceButtonToDots
                            />
                        ),
                    },
                ]}
                rows={patient?.details?.healthState?.allergies || []}
            />

            {/* PRECISA TER DOIS POP UPS SENÃO BUGA O CADASTRO DE UM NOVO!!!!!!!!!!!!! */}
            <QN_PopUp
                isPopUpOpen={isAllergiesOpened}
                setPopUpOpen={setIsAllergiesOpened}
            // config={{
            //     message: (
            //         <>
            //             <AllergiesEditablePopUp allergieRecord={allergiesOpened} />
            //         </>
            //     ),
            //     width: '500px',
            //     height: 'fit-content'
            // }}
            />

            <QN_PopUp
                isPopUpOpen={newAllergiesPopUp}
                setPopUpOpen={setNewAllergiesPopUp}
            // config={{
            //     message: (
            //         <>
            //             <AllergiesEditablePopUp allergieRecord={allergiesOpened} />
            //         </>
            //     ),
            //     width: '500px',
            //     height: 'fit-content'
            // }}
            />
        </div>
    )
}