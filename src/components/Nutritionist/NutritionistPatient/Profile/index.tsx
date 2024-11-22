'use client'
import { useState } from 'react'
import QN_Form from '@/components/QN_Form'
import QN_FormRow from '@/components/QN_FormRow'
import { useNutritionistPatient } from '@/context/modal.patient.context'
import QN_Input2 from '@/components/QN_Input2'
import QN_TextArea from '@/components/QN_TextArea'
import QN_Button from '@/components/QN_Button'
import { address } from 'framer-motion/client'
import QN_CheckBoxGroup from '@/components/QN_CheckBoxGroup'
import QN_Tabs from '@/components/QN_Tabs'
import QN_DropDown from '@/components/QN_DropDown'

export default function QN_NutritionistPatient_ProfilePage() {
    const { patient } = useNutritionistPatient()

    const [personalForm, setPersonalForm] = useState({
        firstName: patient?.name || '',
        lastName: patient?.name || '',
        birth: '',
        gender: '',
        height: '',
    })

    const [nutritionalInfo, setNutritionalInfo] = useState({
        followUpTime: '',
        firstConsultation: patient?.createdAt,
        lastConsultation: ''
    })

    const [addressForm, setAddressForm] = useState({
        street: '',
        number: '',
        complement: '',
        cep: '',
        hood: '',
        city: '',
        state: ''
    })

    const [contactForm, setContactForm] = useState({
        email: patient?.email || '',
        phone: '',
    })

    // Função para verificar números e caracteres especiais
    const verificarTexto = (texto: string) => {
        const regex = /[^a-zA-Záéíóúãõâêîôûç\s]/
        return !regex.test(texto)
    };

    const verificaNumero = (texto: string) => {
        const regex = /\d/; // Verifica se há qualquer número
        return !regex.test(texto);
    };

    function formatarCPF(cpf: string): string {
        // Remove tudo que não é número
        const apenasNumeros = cpf.replace(/\D/g, "");

        // Aplica a máscara do CPF
        return apenasNumeros
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "80%",
                padding: "20px",
                gap: '20px',
                height: '100%',
                overflowY: 'auto'
            }}
        >
            <h1>Profile Page</h1>
            <QN_Form title="Informações Pessoais" >
                <QN_FormRow>
                    <QN_Input2
                        label='Primeiro nome'
                        value={personalForm.firstName}
                        onChange={e => setPersonalForm({
                            ...personalForm,
                            firstName: e.target.value
                        })}
                        validation={verificarTexto}
                    />
                    <QN_Input2
                        label='Último nome'
                        value={personalForm.lastName}
                        onChange={e => setPersonalForm({
                            ...personalForm,
                            lastName: e.target.value
                        })}
                        validation={verificarTexto}
                    />
                    <QN_Input2
                        label='Data de nascimento'
                        value={personalForm.birth}
                        onChange={e => setPersonalForm({
                            ...personalForm,
                            birth: e.target.value
                        })}
                        type='date'
                    />
                </QN_FormRow>
                <QN_FormRow>
                    <QN_Input2 label='Data da primeira consulta' value={new Date(nutritionalInfo.firstConsultation).toISOString().split('T')[0]} onChange={e => setNutritionalInfo({ ...nutritionalInfo, firstConsultation: e.target.value })} type='date' removeStyle={true} />
                </QN_FormRow>
            </QN_Form>
            <QN_Form title="Nutricionais" >
                <QN_FormRow>
                    <QN_Input2 label='Tempo de acompanhamento' value={nutritionalInfo.followUpTime} onChange={e => setNutritionalInfo({ ...nutritionalInfo, followUpTime: e.target.value })} />
                    <QN_Input2 label='Data da última consulta' value={nutritionalInfo.lastConsultation} onChange={e => setNutritionalInfo({ ...nutritionalInfo, lastConsultation: e.target.value })} type='date' />
                </QN_FormRow>
            </QN_Form>

            <QN_Form title='Contato'>
                <QN_FormRow>
                    <QN_Input2 label='E-mail' value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} />
                    <QN_Input2 label='Telefone/Celular' value={contactForm.phone} onChange={e => setContactForm({ ...contactForm, phone: e.target.value })} />
                    <QN_Button colorStyle='blue'>Alterar senha?</QN_Button>
                </QN_FormRow>
            </QN_Form>
            <QN_Form title='Endereço'>
                <QN_FormRow>
                    <QN_Input2 label='CEP' value={addressForm.cep} onChange={e => setAddressForm({ ...addressForm, cep: e.target.value })} />
                    <QN_Input2 label='Número' value={addressForm.number as string} onChange={e => setAddressForm({ ...addressForm, number: e.target.value })} />
                    <QN_Input2 label='Complemento' value={addressForm.complement} onChange={e => setAddressForm({ ...addressForm, complement: e.target.value })} />
                </QN_FormRow>
                <QN_FormRow>
                    <QN_Input2 label='Rua' value={addressForm.street} onChange={e => setAddressForm({ ...addressForm, street: e.target.value })} />
                </QN_FormRow>
                <QN_FormRow>
                    <QN_Input2 label='Bairro' value={addressForm.hood} onChange={e => setAddressForm({ ...addressForm, hood: e.target.value })} />
                    <QN_Input2 label='Cidade' value={addressForm.city} onChange={e => setAddressForm({ ...addressForm, city: e.target.value })} />
                    <QN_Input2 label='Estado' value={addressForm.state} onChange={e => setAddressForm({ ...addressForm, state: e.target.value })} />
                </QN_FormRow>
            </QN_Form>
        </div>
    );
}
