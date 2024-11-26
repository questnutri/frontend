'use client'
import { use, useEffect, useState } from "react"
import QN_Tabs from "../QN_Tabs"
import QN_CardHealthCondition from "./QN_CardHealthCondition"

interface QN_ContainerHealthConditionsProps {
    healthCondition: {
        allergies: string | { name: string; severity: 'mild' | 'moderate' | 'severe'; obs?: string }[]
        chronicDiseases: string | { name: string; diagnosedAt?: Date; treatment?: string }[]
        currentMedications: string | { name: string; dosage?: string; frequency?: string }[]
    };
    onChange: (value: string) => void
}

export default function QN_ContainerHealthConditions({ healthCondition }: QN_ContainerHealthConditionsProps) {
    const [selectedTabIndex, setSelectedTabIndex] = useState<string>('Alergias')
    useEffect(() => {

    }, [selectedTabIndex])
    return (
        <>
            <QN_Tabs
                tabs={['Alergia(s)', 'Medicamentos Atuais', 'Doenças Crônicas']}
                value={selectedTabIndex}
                setValue={setSelectedTabIndex}
                path='healthPage'
            />
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    border: '1px solid',
                    borderRadius: '10px',
                    height: 'fit-content',
                    gap: '10px',
                    padding: '10px',
                    alignItems: 'center',
                    justifyContent: 'start'
                }}
            >
                {selectedTabIndex === 'Alergia(s)' ? (
                    Array.isArray(healthCondition.allergies) ? (
                        <>
                            {healthCondition.allergies.map((allergy, index) => (
                                <QN_CardHealthCondition
                                    key={allergy.name}
                                    name={'teste'}
                                    severity={'moderate'}
                                    obs={allergy.obs}
                                />
                            ))}
                            <QN_CardHealthCondition
                                key={'1'}
                                name={'teste01'}
                                severity={'mild'}
                                obs={''}
                            />
                            <QN_CardHealthCondition
                                key={'3'}
                                name={'teste02'}
                                severity={'severe'}
                                obs={''}
                            />
                            <QN_CardHealthCondition
                                key={'2'}
                                name={'e'}
                                severity={'moderate'}
                                obs={''}
                            />
                            <QN_CardHealthCondition name="Adicionar" />
                        </>
                    ) : (
                        <></>
                    )
                ) : selectedTabIndex === 'Medicamentos Atuais' ? (
                    Array.isArray(healthCondition.currentMedications) ? (
                        <>
                            {healthCondition.currentMedications.map((medication, index) => (
                                <QN_CardHealthCondition
                                    key={medication.name}
                                    name={medication.name}
                                    dosage={medication.dosage}
                                    frequency={medication.frequency}
                                />
                            ))}
                            <QN_CardHealthCondition name="Adicionar" />
                        </>
                    ) : (
                        <></>
                    )
                ) : (
                    Array.isArray(healthCondition.chronicDiseases) ? (
                        <>
                            {healthCondition.chronicDiseases.map((illness, index) => (
                                <QN_CardHealthCondition
                                    key={illness.name}
                                    name={illness.name}
                                    treatment={illness.treatment}
                                    diagnosedAt={illness.diagnosedAt}
                                />
                            ))}
                            <QN_CardHealthCondition name="Adicionar" />
                        </>
                    ) : (
                        <></>
                    )
                )}

            </div>
        </>

    )
}