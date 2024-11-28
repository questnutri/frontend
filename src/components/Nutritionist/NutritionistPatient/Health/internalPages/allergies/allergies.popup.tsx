'use client'
import QN_Button from "@/components/QN_Components/QN_Button";
import QN_DropDown from "@/components/QN_Components/QN_DropDown";
import QN_Input from "@/components/QN_Components/QN_Input";
import { usePopUp } from "@/components/QN_Components/QN_PopUp/popup.context";
import { usePopUpGlobal } from "@/components/QN_Components/QN_PopUp/popup.global.context";
import { useNutritionistPatient } from "@/context/modal.patient.context";
import { createAllergy, updateAllergy } from "@/lib/Health/fetchAllergy";
import IAllergies from "@/models/Patient/Health/Allergies.interface";
import { useState } from "react";

export default function AllergiesEditablePopUp({ allergieRecord }: { allergieRecord: IAllergies | null }) {
    const { showPopUp } = usePopUpGlobal()
    const { closePopUp } = usePopUp()
    const { patient, fetchPatient } = useNutritionistPatient()
    const [allergie, setAllergie] = useState<IAllergies | null>(allergieRecord || {
        name: '',
        severity: 'mild',
        obs: ''
    })

    const handleChange = (field: keyof IAllergies, value: string) => {
        if (allergie) {
            setAllergie({
                ...allergie,
                [field]: value
            })
        }
    }

    const handleSave = async () => {
        if (allergieRecord) {
            const res = await updateAllergy(patient!._id, allergieRecord!._id as string, { ...allergie })
            if (res.status == 200) {
                await fetchPatient()
                showPopUp({
                    titleConfig: {
                        title: 'Alergia salva!'
                    },
                    defaultButtons: {
                        okButton: true
                    }
                })
            }
            closePopUp()
        } else {
            const res = await createAllergy(patient!._id, {
                ...allergie
            })
            if (res.status == 201) {
                await fetchPatient()
                showPopUp({
                    titleConfig: {
                        title: 'Alergia criada!'
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
            <h1 style={{ fontWeight: '600' }}>Registrar nova alergia</h1>
            <div>
                <QN_Input
                    value={allergie?.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                    label='Nome'
                />
                <QN_DropDown
                    value={allergie?.severity || ''}
                    onChange={(e) => handleChange('severity', e)}
                    label='Gravidade'
                    items={[
                        {
                            label: 'Leve',
                            value: 'mild'
                        },
                        {
                            label: 'Moderado',
                            value: 'moderate'
                        },
                        {
                            label: 'Grave',
                            value: 'severe'
                        },
                    ]}
                    buttonConfig={{
                        backgroundColor: 'lightgray'
                    }}
                />
                <QN_Input
                    value={allergie?.obs || ''}
                    onChange={(e) => handleChange('obs', e.target.value)}
                    label='Observação'
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <QN_Button colorStyle='red' onClick={closePopUp}>Cancelar</QN_Button>
                <QN_Button onClick={handleSave}>{allergieRecord ? 'Salvar' : 'Criar'}</QN_Button>

            </div>

        </div>
    )
}