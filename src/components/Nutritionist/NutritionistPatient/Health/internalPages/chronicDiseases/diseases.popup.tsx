'use client'
import QN_Button from "@/components/QN_Components/QN_Button";
import QN_Input from "@/components/QN_Components/QN_Input";
import { usePopUp } from "@/components/QN_Components/QN_PopUp/popup.context";
import { usePopUpGlobal } from "@/components/QN_Components/QN_PopUp/popup.global.context";
import { useNutritionistPatient } from "@/context/modal.patient.context";
import { createDisease, updateChronic } from "@/lib/Health/fetchDisease";
import IDisease from "@/models/Patient/Health/Diseases.interface";
import { useState } from "react";

export default function ChronicDiseasesEditablePopUp({ diseasesRecord }: { diseasesRecord: IDisease | null }) {
    const { showPopUp } = usePopUpGlobal()
    const { closePopUp } = usePopUp()
    const { patient, fetchPatient } = useNutritionistPatient()
    const [chronicDiseases, setChronicDiseases] = useState<IDisease>(diseasesRecord || {
        name: '',
        diagnosedAt: new Date(),
        treatment: ''
    })

    const handleChange = (field: keyof IDisease, value: string) => {
        if (chronicDiseases) {
            setChronicDiseases({
                ...chronicDiseases,
                [field]: value
            })
        }
    }

    const handleSave = async () => {
        if (chronicDiseases) {
            const res = await updateChronic(patient!._id, chronicDiseases!._id as string, { ...chronicDiseases })
            if (res.status == 200) {
                await fetchPatient()
                showPopUp({
                    titleConfig: {
                        title: 'Doença salvo!'
                    },
                    defaultButtons: {
                        okButton: true
                    }
                })
            }
            closePopUp()
        } else {
            const res = await createDisease(patient!._id, {
                ...chronicDiseases
            })
            if (res.status == 201) {
                await fetchPatient()
                showPopUp({
                    titleConfig: {
                        title: 'Doença criado!'
                    },
                    defaultButtons: {
                        okButton: true
                    }
                })
            }
            closePopUp()

        }

    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '20px' }}>
            <h1 style={{ fontWeight: '600' }}>Registrar novo doença crônica</h1>
            <div>
                <QN_Input
                    value={chronicDiseases?.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                    label='Nome'
                />
                <QN_Input
                    value={chronicDiseases?.treatment || ''}
                    onChange={(e) => handleChange('treatment', e.target.value)}
                    label='Tratamento'
                />
                <QN_Input
                    value={
                        chronicDiseases.diagnosedAt
                            ? new Date(chronicDiseases.diagnosedAt).toISOString().slice(0, 10)
                            : ""
                    }
                    onChange={(e) => handleChange('diagnosedAt', e.target.value)}
                    label='Data diaginostico'
                    type="date"
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <QN_Button colorStyle='red' onClick={closePopUp}>Cancelar</QN_Button>
                <QN_Button onClick={handleSave}>{diseasesRecord ? 'Salvar' : 'Criar'}</QN_Button>

            </div>

        </div>
    )
}