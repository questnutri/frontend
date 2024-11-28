'use client'
import QN_Button from "@/components/QN_Components/QN_Button";
import QN_Input from "@/components/QN_Components/QN_Input";
import { usePopUp } from "@/components/QN_Components/QN_PopUp/popup.context";
import { usePopUpGlobal } from "@/components/QN_Components/QN_PopUp/popup.global.context";
import { useNutritionistPatient } from "@/context/modal.patient.context";
import { createMedication, updateMedication } from "@/lib/Health/fetchMedication";
import IMedication from "@/models/Patient/Health/Medication.interface";

import { useState } from "react";

export default function MedicineEditablePopUp({ medicineRecord }: { medicineRecord: IMedication | null }) {
    const { showPopUp } = usePopUpGlobal()
    const { closePopUp } = usePopUp()
    const { patient, fetchPatient } = useNutritionistPatient()
    const [medicine, setMedicine] = useState<IMedication>(medicineRecord || {
        name: '',
        dosage: '',
        frequency: ''
    })

    const handleChange = (field: keyof IMedication, value: string) => {
        if (medicine) {
            setMedicine({
                ...medicine,
                [field]: value
            })
        }
    }

    const handleSave = async () => {
        if (medicineRecord) {
            const res = await updateMedication(patient!._id, medicineRecord!._id as string, { ...medicine })
            if (res.status == 200) {
                await fetchPatient()
                showPopUp({
                    titleConfig: {
                        title: 'Medicamento salvo!'
                    },
                    defaultButtons: {
                        okButton: true
                    }
                })
            }
            closePopUp()
        } else {
            const res = await createMedication(patient!._id, {
                ...medicine
            })
            if (res.status == 201) {
                await fetchPatient()
                showPopUp({
                    titleConfig: {
                        title: 'Medicamento criado!'
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
            <h1 style={{ fontWeight: '600' }}>Registrar novo medicamento</h1>
            <div>
                <QN_Input
                    value={medicine!.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    label='Nome'
                />
                <QN_Input
                    value={medicine?.dosage || ''}
                    onChange={(e) => handleChange('dosage', e.target.value)}
                    label='Dosagem'
                />
                <QN_Input
                    value={medicine?.frequency || ''}
                    onChange={(e) => handleChange('frequency', e.target.value)}
                    label='Frequência'
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <QN_Button colorStyle='red' onClick={closePopUp}>Cancelar</QN_Button>
                <QN_Button onClick={handleSave}>{medicineRecord ? 'Salvar' :  'Criar'}</QN_Button>

            </div>

        </div>
    )
}