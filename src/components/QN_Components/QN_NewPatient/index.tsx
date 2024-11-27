import { useState } from "react";
import QN_Form from "../QN_Form";
import QN_FormRow from "../QN_FormRow";
import QN_Input from "../QN_Input";
import QN_DropDown from "../QN_DropDown";
import QN_Button from "../QN_Button";

interface QN_NewPatientProps {
    isOpen: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function QN_NewPatient({ setOpen, isOpen }: QN_NewPatientProps) {

    const closeModal = () => setOpen(false)

    const [isLoading, setIsLoading] = useState(false)
    const [newPatient, setNewPatient] = useState({
        firstName: '',
        lastName: '',
        birth: new Date().toISOString().split('T')[0],
        email: '',
        rg: '',
        cpf: '',
        gender: '',
        phone: ''
    })

    const genderOptions = [
        { label: 'Masculino', value: 'male' },
        { label: 'Feminino', value: 'female' },
        { label: 'Outros', value: 'others' },
    ];

    const handleSave = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 4000)
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100vh',
                justifyContent: 'start',
                alignItems: 'center',
                padding: '30px',
                backgroundColor: 'white'
            }}
        >
            <QN_Form title="Cadastrar Novo Paciente">
                <QN_FormRow >
                    <QN_Input
                        label="Nome"
                        value={newPatient.firstName}
                        onChange={(e) => setNewPatient({ ...newPatient, firstName: e.target.value })}
                    />
                    <QN_Input
                        label="Sobrenome"
                        value={newPatient.lastName}
                        onChange={(e) => setNewPatient({ ...newPatient, lastName: e.target.value })}
                    />
                    <QN_Input
                        label="Data de nascimento"
                        value={newPatient.birth.toLocaleString()}
                        onChange={e => setNewPatient({
                            ...newPatient,
                            birth: e.target.value
                        })}
                        type="date"
                    />

                </QN_FormRow>
                <QN_FormRow>
                    <QN_Input
                        label="RG"
                        value={newPatient.rg}
                        onChange={(e) => setNewPatient({ ...newPatient, rg: e.target.value })}
                    // mask="##.###.###-#"
                    />
                    <QN_Input
                        label="CPF"
                        value={newPatient.cpf}
                        onChange={(e) => setNewPatient({ ...newPatient, cpf: e.target.value })}
                    // mask="###.###.###-##"
                    />
                    <QN_DropDown
                        label="Gênero"
                        value={newPatient.gender}
                        items={genderOptions}
                        onChange={(e) => setNewPatient({ ...newPatient, gender: e })}
                        widthButton="100%"
                    />
                </QN_FormRow>
                <QN_FormRow>
                    <QN_Input
                        label="E-mail"
                        value={newPatient.email}
                        onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                    />
                    <QN_Input
                        label="Telefone"
                        value={newPatient.phone}
                        onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                    // mask="(##) #####-####"
                    />
                </QN_FormRow>
                <QN_FormRow >
                    <QN_Button
                        colorStyle="red"
                        width="50%"
                        marginTop="5%"
                        onClick={closeModal}
                    >
                        Cancelar
                    </QN_Button>
                    <QN_Button
                        colorStyle="blue"
                        width="50%"
                        marginTop="5%"
                        isLoading={isLoading}
                        onClick={handleSave}
                    >
                        Salvar
                    </QN_Button>
                </QN_FormRow>
            </QN_Form>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                    height: '100%',
                    padding: '0% 30%'
                }}
            >
            </div>
        </div>
    )
}