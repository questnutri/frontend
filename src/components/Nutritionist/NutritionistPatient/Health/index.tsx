import QN_Input from "@/components/QN_Components/QN_Input"
import QN_Navbar from "@/components/QN_Components/QN_Navbar"
import QN_TextArea from "@/components/QN_Components/QN_TextArea"
import { useState } from "react"
import HealthConditions from "./healthConditions"
import QN_Button from "@/components/QN_Components/QN_Button"
import { useNutritionistPatient } from "@/context/modal.patient.context"
import { updateOnePatient } from "@/lib/fetchPatients"
import { usePopUpGlobal } from "@/components/QN_Components/QN_PopUp/popup.global.context"

export default function QN_NutritionistPatient_HealthPage() {
    const { patient, fetchPatient } = useNutritionistPatient()
    const { showPopUp } = usePopUpGlobal()

    const [goals, setGoals] = useState<string>(patient?.details?.goals || '')
    const [routine, setRoutine] = useState(patient?.details?.routine || '')
    const [foodPreferences, setFoodPreferences] = useState(patient?.details?.foodPreferences || '')

    const handleSave = async (field: any, value: any) => {
        const data = await updateOnePatient(patient!._id, {
            details: {
                ...patient!.details,
                [field]: value
            }
        })
        if (data.status == 200) {
            showPopUp({
                windowConfig: {
                    width: '200px'
                },
                titleConfig: {
                    title: 'Dados salvos com sucesso!'
                },
                defaultButtons: {
                    okButton: true
                }
            })
        } else {
            showPopUp({
                windowConfig: {
                    width: '200px'
                },
                titleConfig: {
                    title: 'Erro! Tente novamente.'
                },
                defaultButtons: {
                    okButton: true
                }
            })
        }
        await fetchPatient()
    }



    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '30px',
            gap: '30px',
            height: '100%',
        }}>
            <div style={{}}>
                <QN_Input
                    label={'Objetivo da dieta'}
                    labelBtn={
                        <div style={{ marginRight: '-8px', marginBottom: '3px'}}>
                        <QN_Button
                            width='50px'
                            height='20px'
                            borderRadius='5px'
                            fontSize='12px'
                            noShadow
                            onClick={() => handleSave('goals', goals)}
                        >
                            Salvar
                        </QN_Button>
                    </div>
                    }
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                />
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
                <QN_TextArea
                    label={'Rotina'}
                    value={routine}
                    onChange={(e) => setRoutine(e.target.value)}
                    maxRows={8}
                    minRows={8}
                    height='200px'
                    labelBtn={
                        <div style={{ paddingRight: '3px', marginBottom: '3px' }}>
                            <QN_Button
                                width='50px'
                                height='20px'
                                borderRadius='5px'
                                fontSize='12px'
                                noShadow
                                onClick={() => handleSave('routine', routine)}
                            >
                                Salvar
                            </QN_Button>
                        </div>
                    }
                />
                <QN_TextArea
                    label={'Preferência alimentar'}
                    value={foodPreferences}
                    onChange={(e) => setFoodPreferences(e.target.value)}
                    maxRows={8}
                    minRows={8}
                    height='200px'
                    labelBtn={
                        <div style={{ paddingRight: '3px',marginBottom: '3px' }}>
                            <QN_Button
                                width='50px'
                                height='20px'
                                borderRadius='5px'
                                fontSize='12px'
                                noShadow
                                onClick={() => handleSave('foodPreferences', foodPreferences)}

                            >
                                Salvar
                            </QN_Button>
                        </div>
                    }
                />

            </div>
            <HealthConditions />

        </div>
    )
}