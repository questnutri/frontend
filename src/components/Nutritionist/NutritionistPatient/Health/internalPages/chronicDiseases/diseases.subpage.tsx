'use client'

import QN_DropDown from "@/components/QN_Components/QN_DropDown"
import { QN_PopUp } from "@/components/QN_Components/QN_PopUp"
import QN_Table from "@/components/QN_Components/QN_Table"
import { useNutritionistPatient } from "@/context/modal.patient.context"
import { useEffect, useState } from "react"
import QN_Button from "@/components/QN_Components/QN_Button"
import IChronicDiseases from "@/models/Patient/Health/Diseases.interface"
import ChronicDiseasesPopUp from "./diseases.popup"

export default function ChronicDiseasesSubPage() {
    const { patient } = useNutritionistPatient()
    const [isChronicDiseasesOpened, setIsAllergiesOpened] = useState(false)
    const [chronicDiseasesOpened, setChronicDiseasesOpened] = useState<IChronicDiseases | null>(null)

    const handleEditAction = (row: any) => {
        setChronicDiseasesOpened(row)
    }

    useEffect(() => {
        if (chronicDiseasesOpened) {
            setIsAllergiesOpened(true)
        }
    }, [chronicDiseasesOpened])

    useEffect(() => {
        if (!isChronicDiseasesOpened) {
            setChronicDiseasesOpened(null)
        }
    }, [isChronicDiseasesOpened])

    const [newChronicDiseasesPopUp, setNewChronicDiseasesPopUp] = useState(false)

    return (
        <div style={{ width: '100%', padding: '15px' }}>
            <div style={{ display: 'flex', padding: '0px 5px 15px', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1
                    style={{ color: '#55B7FE', fontWeight: '600', fontSize: '20px' }}
                >
                    Doenças Crônicas
                </h1>
                <div style={{}}>
                    <QN_Button
                        width='fit-content'
                        height='30px'
                        borderRadius='5px'
                        onClick={() => setNewChronicDiseasesPopUp(true)}
                    >
                        + Adicionar novo</QN_Button>
                </div>

            </div>

            <QN_Table
                columns={[
                    { key: 'name', label: 'Doença' },
                    { key: 'severity', label: 'Tratamento' },
                    { key: 'obs', label: 'Data diaginostico' },
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
                rows={patient?.details?.healthState?.chronicDiseases || []}
            />

            {/* PRECISA TER DOIS POP UPS SENÃO BUGA O CADASTRO DE UM NOVO!!!!!!!!!!!!! */}
            <QN_PopUp
                isPopUpOpen={isChronicDiseasesOpened}
                setPopUpOpen={setIsAllergiesOpened}
                styleConfig={{
                    windowConfig: {
                        width: '500px',
                        height: 'fit-content'
                    },
                    bodyConfig: {
                        content: (
                            <>
                                <ChronicDiseasesPopUp chronicDiseasesRecord={chronicDiseasesOpened} />
                            </>
                        )
                    }
                }}
            />

            <QN_PopUp
                isPopUpOpen={newChronicDiseasesPopUp}
                setPopUpOpen={setNewChronicDiseasesPopUp}
                styleConfig={{
                    windowConfig: {
                        width: '500px',
                        height: 'fit-content'
                    },
                    bodyConfig: {
                        content: (
                            <>
                                <ChronicDiseasesPopUp chronicDiseasesRecord={chronicDiseasesOpened} />
                            </>
                        )
                    }
                }}
            />
        </div>
    )
}