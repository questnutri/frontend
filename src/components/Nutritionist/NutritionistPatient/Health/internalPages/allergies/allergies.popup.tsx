'use client'
import QN_Button from "@/components/QN_Components/QN_Button";
import QN_DropDown from "@/components/QN_Components/QN_DropDown";
import QN_Input from "@/components/QN_Components/QN_Input";
import { usePopUp } from "@/components/QN_Components/QN_PopUp/popup.context";
import IAllergies from "@/models/Patient/Health/Allergies.interface";
import { useState } from "react";

export default function AllergiesEditablePopUp({ allergieRecord }: { allergieRecord: IAllergies | null }) {
    const { closePopUp } = usePopUp()
    const [allergie, setAllergie] = useState<IAllergies | null>(allergieRecord)

    const handleChange = (field: keyof IAllergies, value: string) => {
        if (allergie) {
            setAllergie({
                ...allergie,
                [field]: value
            })
        }
    }

    console.log(allergie);


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
                <QN_Button>Salvar</QN_Button>

            </div>

        </div>
    )
}