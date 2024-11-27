'use client'
import QN_Button from "@/components/QN_Components/QN_Button";
import QN_Input from "@/components/QN_Components/QN_Input";
import { usePopUp } from "@/components/QN_Components/QN_PopUp/popup.context";
import IMedicine from "@/models/Patient/Health/Medicine.interface";
import { useState } from "react";

export default function MedicineEditablePopUp({ medicineRecord }: { medicineRecord: IMedicine | null }) {
    const {closePopUp} = usePopUp()
    const [medicine, setMedicine] = useState<IMedicine | null>(medicineRecord)

    const handleChange = (field: keyof IMedicine, value: string) => {
        if (medicine) {
            setMedicine({
                ...medicine,
                [field]: value
            })
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '20px' }}>
            <h1 style={{ fontWeight: '600' }}>Registrar novo medicamento</h1>
            <div>
                <QN_Input
                    value={medicine?.name || ''}
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
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <QN_Button colorStyle='red' onClick={closePopUp}>Cancelar</QN_Button>
                <QN_Button>Salvar</QN_Button>

            </div>

        </div>
    )
}