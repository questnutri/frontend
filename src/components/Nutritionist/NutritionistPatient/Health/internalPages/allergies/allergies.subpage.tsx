'use client'

import QN_DropDown from "@/components/QN_Components/QN_DropDown"
import { QN_PopUp } from "@/components/QN_Components/QN_PopUp"
import QN_Table from "@/components/QN_Components/QN_Table"
import { useNutritionistPatient } from "@/context/modal.patient.context"
import { useEffect, useState } from "react"
import QN_Button from "@/components/QN_Components/QN_Button"
import IAllergies from "@/models/Patient/Health/Allergies.interface"
import AllergiesEditablePopUp from "./allergies.popup"
import { usePopUpGlobal } from "@/components/QN_Components/QN_PopUp/popup.global.context"
import { deleteAllergy } from "@/lib/Health/fetchAllergy"

export default function AllergiesSubpage() {
    const { patient, fetchPatient } = useNutritionistPatient()
    const { showPopUp } = usePopUpGlobal()

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

    const handleAllergyDelete = async (row: any) => {
        const data = await deleteAllergy(patient!._id, row)
        if (data.status == 200) {
            await fetchPatient()
            showPopUp({
                titleConfig: {
                    title: 'Medicamento excluído!'
                },
                defaultButtons: {
                    okButton: true
                }
            })
        }
    }

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
                                        handleAllergyDelete(row)
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
                rows={
                    patient?.details?.healthState?.allergies?.sort((a: IAllergies, b: IAllergies) =>
                        a.name.localeCompare(b.name)
                    ) || []
                }
            />

            {/* PRECISA TER DOIS POP UPS SENÃO BUGA O CADASTRO DE UM NOVO!!!!!!!!!!!!! */}
            <QN_PopUp
                isPopUpOpen={isAllergiesOpened}
                setPopUpOpen={setIsAllergiesOpened}
                styleConfig={{
                    windowConfig: {
                        width: '500px',
                        height: 'fit-content'
                    },
                    bodyConfig: {
                        content: (
                            <>
                                <AllergiesEditablePopUp allergieRecord={allergiesOpened} />
                            </>
                        )
                    }
                }}
            />

            <QN_PopUp
                isPopUpOpen={newAllergiesPopUp}
                setPopUpOpen={setNewAllergiesPopUp}
                styleConfig={{
                    windowConfig: {
                        width: '500px',
                        height: 'fit-content'
                    },
                    bodyConfig: {
                        content: (
                            <>
                                <AllergiesEditablePopUp allergieRecord={allergiesOpened} />
                            </>
                        )
                    }
                }}
            />
        </div>
    )
}
