import QN_Button from "@/components/QN_Components/QN_Button";
import QN_DropDown from "@/components/QN_Components/QN_DropDown";
import QN_Form from "@/components/QN_Components/QN_Form";
import QN_FormRow from "@/components/QN_Components/QN_FormRow";
import QN_Input from "@/components/QN_Components/QN_Input";
import { useModal } from "@/components/QN_Components/QN_Modal/modal.context";
import { useState } from "react";

export default function QN_NewPatient() {
    const {closeModal} = useModal()

    const [isLoading, setIsLoading] = useState(false)
    const [newPatient, setNewPatient] = useState({
        firstName: '',
        lastName: '',
        birth: '',
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

    const handleCreate = () => {
        setIsLoading(true)
    }

    return (
        <div
            style={{
                display: 'flex',
                height: 'fit-content',
                justifyContent: 'start',
                alignItems: 'center',
                backgroundColor: 'white',
                padding: '10px'
            }}
        >
            <QN_Form
                title="Cadastrar Novo Paciente"
                formConfig={{
                    border: 'none'
                }}
            >
                <QN_FormRow >
                    <QN_Input
                        label="Nome"
                        value={newPatient.firstName}
                        onChange={(e) => setNewPatient({ ...newPatient, firstName: e.target.value })}
                        required
                    />
                    <QN_Input
                        label="Sobrenome"
                        value={newPatient.lastName}
                        onChange={(e) => setNewPatient({ ...newPatient, lastName: e.target.value })}
                        required
                    />
                    <QN_Input
                        label="Data de nascimento"
                        value={newPatient.birth.toLocaleString()}
                        onChange={e => setNewPatient({
                            ...newPatient,
                            birth: e.target.value
                        })}
                        type="date"
                        required
                    />

                </QN_FormRow>
                <QN_FormRow>
                    <QN_Input
                        label="RG"
                        value={newPatient.rg}
                        onChange={(e) => setNewPatient({ ...newPatient, rg: e.target.value })}
                        mask="##.###.###-#"
                        required
                    />
                    <QN_Input
                        label="CPF"
                        value={newPatient.cpf}
                        onChange={(e) => setNewPatient({ ...newPatient, cpf: e.target.value })}
                        mask="###.###.###-##"
                        required
                    />
                    <QN_DropDown
                        label="Gênero"
                        value={newPatient.gender}
                        items={genderOptions}
                        onChange={(e) => setNewPatient({ ...newPatient, gender: e })}
                        buttonConfig={{
                            width: '100%'
                        }}
                        required
                    />
                </QN_FormRow>
                <QN_FormRow>
                    <QN_Input
                        label="E-mail"
                        value={newPatient.email}
                        onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                        required
                    />
                    <QN_Input
                        label="Telefone"
                        value={newPatient.phone}
                        onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                        required
                        mask="(##) #####-####"
                    />
                </QN_FormRow>
                <QN_FormRow >
                    <QN_Button
                        colorStyle="red"
                        width="70%"
                        marginTop="5%"
                        onClick={closeModal}
                    >
                        Cancelar
                    </QN_Button>
                    <QN_Button
                        colorStyle="blue"
                        width="70%"
                        marginTop="5%"
                        isLoading={isLoading}
                        onClick={handleCreate}
                    >
                        Criar
                    </QN_Button>
                </QN_FormRow>
            </QN_Form>
        </div>
    )
}