'use client'

import QN_DropDown from "@/components/QN_Components/QN_DropDown"
import { QN_PopUp } from "@/components/QN_Components/QN_PopUp"
import QN_Table from "@/components/QN_Components/QN_Table"
import { useNutritionistPatient } from "@/context/modal.patient.context"
import { useEffect, useState } from "react"
import QN_Button from "@/components/QN_Components/QN_Button"
import ChronicDiseasesPopUp from "./diseases.popup"
import { usePopUpGlobal } from "@/components/QN_Components/QN_PopUp/popup.global.context"
import { deleteChronic } from "@/lib/Health/fetchDisease"
import IDisease from "@/models/Patient/Health/Diseases.interface"

export default function ChronicDiseasesSubPage() {
    const { patient, fetchPatient } = useNutritionistPatient()
    const { showPopUp } = usePopUpGlobal()

    const [isChronicDiseasesOpened, setIsAllergiesOpened] = useState(false)
    const [chronicDiseasesOpened, setChronicDiseasesOpened] = useState<IDisease | null>(null)

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

    const handleChronicDelete = async (row: any) => {
        const data = await deleteChronic(patient!._id, row)
        if (data.status == 200) {
            await fetchPatient()
            showPopUp({
                titleConfig: {
                    title: 'Doença excluída!'
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
                    { key: 'diagnosedAt', label: 'Tratamento' },
                    { key: 'treatment', label: 'Data diaginostico' },
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
                                        handleChronicDelete(row)
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
                    patient?.details?.healthState?.chronicDiseases?.sort((a: IDisease, b: IDisease) =>
                        a.name.localeCompare(b.name)
                    ) || []
                }
            />

            {/* PRECISA TER DOIS POP UPS SENÃO BUGA O CADASTRO DE UM NOVO!!!!!!!!!!!!! */}
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
                                <ChronicDiseasesPopUp diseasesRecord={chronicDiseasesOpened} />
                            </>
                        )
                    }
                }}
            />

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
                                <ChronicDiseasesPopUp diseasesRecord={chronicDiseasesOpened} />
                            </>
                        )
                    }
                }}
            />
        </div>
    )
}