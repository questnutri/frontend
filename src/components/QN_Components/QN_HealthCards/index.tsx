
import { useNutritionistPatient } from "@/context/modal.patient.context";
import { useEffect } from "react";
import QN_TextArea from "../QN_TextArea";
import QN_Button from "../QN_Button";

interface QN_HealthCardsProps {
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isSelected: boolean;
    onSelect: (selected: boolean) => void;
    anyCardSelected: boolean;
}

export default function QN_HealthCards({
    id,
    name,
    value,
    onChange,
    isSelected,
    onSelect,
    anyCardSelected
}: QN_HealthCardsProps) {
    const { patient } = useNutritionistPatient();

    const handleClose = () => {
        onSelect(false);
    };

    const handleSave = () => {
        // Implementar lógica de salvamento aqui
        onSelect(false);
    };

    const handleTextAreaClick = () => {
        if (!isSelected) {
            onSelect(true);
        }
    };

    // Se algum card estiver selecionado e este não é o selecionado,
    // mostra apenas o título
    const isCompact = anyCardSelected && !isSelected;

    return (
        <div
            style={{
                width: '100%',
                backgroundColor: isCompact ? "#E0E0E0" : "#55b7fe",
                height: isCompact ? "50px" : isSelected ? "250px" : "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: isCompact ? "center" : "space-between",
                alignItems: "center",
                borderRadius: "5px",
                padding: isCompact ? "5px" : "10px",
                cursor: isCompact ? "default" : "pointer",
                flex: isSelected ? '100%' : '1',
                transition: 'all 0.4s ease-out',
                opacity: isCompact ? 0.7 : 1,
            }}
            onClick={() => !anyCardSelected && handleTextAreaClick()}
        >
            <h1
                style={{
                    color: isCompact ? '#666666' : 'white',
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: 0
                }}
            >
                {name}
            </h1>

            {!isCompact && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '80%'
                    }}
                >
                    <QN_TextArea
                        value={value}
                        onChange={onChange}
                        isSelected={isSelected}
                        setIsSelected={handleTextAreaClick}
                    />
                    {isSelected && (
                        <div
                            style={{
                                width: '40%',
                                display: 'flex',
                                gap: '10px',
                                marginBottom: '20px'
                            }}
                        >
                            <QN_Button colorStyle="red" onClick={handleClose}>
                                Fechar
                            </QN_Button>
                            <QN_Button colorStyle="white" onClick={handleSave} >
                                Salvar
                            </QN_Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}