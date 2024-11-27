'use client'

import QN_DropDown from "@/components/QN_Components/QN_DropDown"
import { QN_PopUp } from "@/components/QN_Components/QN_PopUp"
import QN_Table from "@/components/QN_Components/QN_Table"
import { useNutritionistPatient } from "@/context/modal.patient.context"
import { useEffect, useState } from "react"
import QN_Button from "@/components/QN_Components/QN_Button"
import MedicineEditablePopUp from "./medicine"
import IMedicine from "@/models/Patient/Health/Medicine.interface"

export default function MedicineSubpage() {
    const { patient } = useNutritionistPatient()
    const [isMedicineOpened, setIsMedicineOpened] = useState(false)
    const [medicineOpened, setMedicineOpened] = useState<IMedicine | null>(null)

    const handleEditAction = (row: any) => {
        setMedicineOpened(row)
    }

    useEffect(() => {
        if (medicineOpened) {
            setIsMedicineOpened(true)
        }
    }, [medicineOpened])

    useEffect(() => {
        if (!isMedicineOpened) {
            setMedicineOpened(null)
        }
    }, [isMedicineOpened])

    const [newMedicinePopUp, setNewMedicinePopUp] = useState(false)

    return (
        <div style={{ width: '100%', padding: '30px' }}>
            <div style={{ display: 'flex', padding: '0px 5px 15px', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1
                    style={{ color: '#55B7FE', fontWeight: '600', fontSize: '20px' }}
                >
                    Medicamentos
                </h1>
                <div style={{}}>
                    <QN_Button
                        width='fit-content'
                        height='30px'
                        borderRadius='5px'
                        onClick={() => setNewMedicinePopUp(true)}
                    >
                        + Adicionar novo</QN_Button>
                </div>

            </div>

            <QN_Table
                columns={[
                    { key: 'name', label: 'Medicamento' },
                    { key: 'dosage', label: 'Dosagem' },
                    { key: 'frequency', label: 'Frequência' },
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
                rows={patient?.details?.healthState?.currentMedications || []}
            />

            {/* PRECISA TER DOIS POP UPS SENÃO BUGA O CADASTRO DE UM NOVO!!!!!!!!!!!!! */}
            <QN_PopUp
                isPopUpOpen={isMedicineOpened}
                setPopUpOpen={setIsMedicineOpened}
                styleConfig={{
                    windowConfig: {
                        width: '500px',
                        height: 'fit-content'
                    },
                    bodyConfig: {
                        content: (
                            <>
                                <MedicineEditablePopUp medicineRecord={medicineOpened} />
                            </>
                        )
                    }
                }}
            />

            <QN_PopUp
                isPopUpOpen={newMedicinePopUp}
                setPopUpOpen={setNewMedicinePopUp}
                styleConfig={{
                    windowConfig: {
                        width: '500px',
                        height: 'fit-content'
                    },
                    bodyConfig: {
                        content: (
                            <>
                                <MedicineEditablePopUp medicineRecord={medicineOpened} />
                            </>
                        )
                    }
                }}
            />
        </div>
    )
}