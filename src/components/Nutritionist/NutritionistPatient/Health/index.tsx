'use client'
import QN_HealthCards from "@/components/QN_Components/QN_HealthCards";
import QN_Tabs from "@/components/QN_Components/QN_Tabs"; 
import { useNutritionistPatient } from "@/context/modal.patient.context";
import { useState } from "react";
import QN_ContainerHealthConditions from "@/components/QN_Components/QN_ContainerHealthConditions";

export default function QN_NutritionistPatient_HealthPage() {
    const { patient } = useNutritionistPatient();

    const [personalCharacteristic, setPersonalCharacteristic] = useState({
        goals: patient?.details?.goals || '',
        routine: patient?.details?.routine || '',
        foodPreferences: patient?.details?.foodPreferences || ''
    });

    const [healthCondition, setHealthCondition] = useState({
        allergies: patient?.details?.healthState?.allergies || '',
        chronicDiseases: patient?.details?.healthState?.chronicDiseases || '',
        currentMedications: patient?.details?.healthState?.currentMedications || ''
    })

    const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
    const anyCardSelected = selectedCardId !== null;

    const cards = [
        {
            id: "goals",
            name: "Objetivos",
            value: personalCharacteristic.goals,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setPersonalCharacteristic({ ...personalCharacteristic, goals: e.target.value })
        },
        {
            id: "routine",
            name: "Rotina",
            value: personalCharacteristic.routine,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setPersonalCharacteristic({ ...personalCharacteristic, routine: e.target.value })
        },
        {
            id: "foodPreferences",
            name: "Preferência alimentar",
            value: personalCharacteristic.foodPreferences,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setPersonalCharacteristic({ ...personalCharacteristic, foodPreferences: e.target.value })
        }
    ];

    const orderedCards = anyCardSelected
        ? [
            ...cards.filter(card => card.id === selectedCardId),
            ...cards.filter(card => card.id !== selectedCardId)
        ]
        : cards;

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                padding: '20px',
                width: '100%',
                alignItems: 'start',
                flexDirection: anyCardSelected ? "row" : 'column',
                border: '1px solid',
                margin: '3px',
                borderRadius: '5px',
                overflowY: 'auto',
                justifyContent: 'start',
                gap: anyCardSelected ? '15px' : '50px'
            }}
        >
            <h1 style={{
                width: '100%',
                textAlign: 'center',
                fontSize: '20px',
                fontWeight: '600',
                color: '#55b7fe'
            }}>Health Page</h1>
            <div
                style={{
                    display: 'flex',
                    flexDirection: anyCardSelected ? 'column' : 'row',
                    gap: '5px',
                    width: '100%',
                    height: anyCardSelected ? '70%' : 'fit-content',
                    transition: 'all 0.3s',
                }}
            >
                {orderedCards.map(card => (
                    <QN_HealthCards
                        key={card.id}
                        id={card.id}
                        name={card.name}
                        value={card.value}
                        onChange={card.onChange}
                        isSelected={selectedCardId === card.id}
                        onSelect={(selected) => {
                            setSelectedCardId(selected ? card.id : null);
                        }}
                        anyCardSelected={anyCardSelected}
                    />
                ))}
            </div>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    justifyContent: 'start',
                    marginTop: '10px'
                }}
            >
                <QN_ContainerHealthConditions healthCondition={healthCondition} onChange={setHealthCondition} />
            </div>
        </div>
    );
}