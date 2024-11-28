'use client'
import QN_Button from "@/components/QN_Components/QN_Button";
import QN_Input from "@/components/QN_Components/QN_Input";
import { usePopUp } from "@/components/QN_Components/QN_PopUp/popup.context";
import IChronicDiseases from "@/models/Patient/Health/chronicDiseases";
import { useState } from "react";

export default function ChronicDiseasesEditablePopUp({ chronicDiseasesRecord }: { chronicDiseasesRecord: IChronicDiseases | null }) {
    const { closePopUp } = usePopUp()
    const [chronicDiseases, setChronicDiseases] = useState<IChronicDiseases | null>(chronicDiseasesRecord)

    const handleChange = (field: keyof IChronicDiseases, value: string) => {
        if (chronicDiseases) {
            setChronicDiseases({
                ...chronicDiseases,
                [field]: value
            })
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
                    value={`${chronicDiseases?.diagnosedAt?.toDateString()}` || ''}
                    onChange={(e) => handleChange('diagnosedAt', e.target.value)}
                    label='Data diaginostico'
                    type="date"
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <QN_Button colorStyle='red' onClick={closePopUp}>Cancelar</QN_Button>
                <QN_Button>Salvar</QN_Button>

            </div>

        </div>
    )
}