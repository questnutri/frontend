'use client'
import { useRef, useState } from 'react'
import QN_Form from '@/components/QN_Form'
import QN_FormRow from '@/components/QN_FormRow'
import { useNutritionistPatient } from '@/context/modal.patient.context'
import QN_Input2 from '@/components/QN_Input2'
import QN_TextArea from '@/components/QN_TextArea'
import QN_Button from '@/components/QN_Button'
import QN_CheckBoxGroup from '@/components/QN_CheckBoxGroup'
import QN_Tabs from '@/components/QN_Tabs'
import QN_DropDown from '@/components/QN_DropDown'
import QN_RadioGroup from '@/components/QN_RadioGroup'
import { fetchCep } from '@/lib/fetchCep'

export default function QN_NutritionistPatient_ProfilePage() {
    const { patient } = useNutritionistPatient()

    const [personalForm, setPersonalForm] = useState({
        firstName: patient?.firstName || '',
        lastName: patient?.lastName || '',
        birth: patient?.details?.birth || '',
        gender: patient?.details?.gender || '',
        height: patient?.details?.height || 0,
        rg: patient?.details?.rg || '589712937',
        cpf: patient?.details?.cpf || '',
    })

    const [nutritionalInfo, setNutritionalInfo] = useState({
        followUpTime: calcularDiasDesdeConsulta(new Date(patient?.createdAt).toISOString().split('T')[0]),
        firstConsultation: '',
        lastConsultation: ''
    })

    const cleanAddress = {
        street: '',
        number: '',
        complement: '',
        cep: '',
        hood: '',
        city: '',
        state: ''
    }
    const [addressForm, setAddressForm] = useState(cleanAddress)

    const [contactForm, setContactForm] = useState({
        email: patient?.email || '',
        phone: '',
    })


    const verificarTexto = (texto: string) => {
        const regex = /[^a-zA-Záéíóúãõâêîôûç\s]/
        return !regex.test(texto)
    }

    function calcularDiasDesdeConsulta(createdAt: string): number {
        const currentDate = new Date()
        const dateObj = new Date(createdAt)

        const diffEmMs = currentDate.getTime() - dateObj.getTime()
        const diffEmDias = diffEmMs / (1000 * 3600 * 24)

        return Math.floor(diffEmDias)
    }

    const verificaNumero = (texto: string) => {
        const regex = /\d/;
        return !regex.test(texto);
    };

    function formatarCPF(cpf: string): string {
        const apenasNumeros = cpf.replace(/\D/g, "");

        return apenasNumeros
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    const [isValidCep, setIsValidCep] = useState(false)
    const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddressForm({ ...addressForm, cep: e.target.value })
        const data = await fetchCep(e.target.value)
        if (data) {
            setIsValidCep(true)
            setAddressForm({
                ...addressForm,
                cep: e.target.value,
                ...data
            })
        } else {
            setIsValidCep(false)
            setAddressForm({
                ...cleanAddress,
                cep: e.target.value,
            })
        }
    }

    const genderMap: Record<'Masculino' | 'Feminino' | 'Outros', 'male' | 'female' | 'others'> = {
        Masculino: "male",
        Feminino: "female",
        Outros: "others",
    };

    const reverseGenderMap: Record<'male' | 'female' | 'others', 'Masculino' | 'Feminino' | 'Outros'> = {
        male: "Masculino",
        female: "Feminino",
        others: "Outros",
    };



    const nameInputRef = useRef<HTMLInputElement>(null)
    const streetInputRef = useRef<HTMLInputElement>(null)

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
                        ref={nameInputRef}
                        label='Nome'
                        value={personalForm.firstName}
                        onChange={e => setPersonalForm({
                            ...personalForm,
                            firstName: e.target.value
                        })}
                        validation={verificarTexto}
                    />
                    <QN_Input2
                        label='Sobrenome'
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
                    <QN_Input2
                        label='RG'
                        value={personalForm.rg}
                        onChange={(e) => {
                            setPersonalForm({
                                ...personalForm,
                                rg: e.target.value
                            })
                        }}
                        mask='##.###.###-#'
                    />
                    <QN_Input2
                        label='CPF'
                        value={personalForm.cpf}
                        onChange={(e) => {
                            setPersonalForm({
                                ...personalForm,
                                cpf: e.target.value
                            })
                        }}
                        mask='###.###.###-##'
                    />
                </QN_FormRow>
                <QN_FormRow>
                    <QN_Input2
                        label='Altura'
                        value={`${personalForm.height} m.`}
                        onChange={(e) => {
                            const newValue = e.target.value.replace(' m.', ''); // Remove a unidade 'm.'
                            const height = parseFloat(newValue); // Converte o valor para um número

                            if (!isNaN(height)) {
                                setPersonalForm({
                                    ...personalForm,
                                    height: height, // Armazena o valor numérico
                                });
                            }
                        }}
                        mask='#.##'
                    />
                    <QN_DropDown
                        label="Gênero"
                        items={Object.keys(genderMap)}
                        value={reverseGenderMap[personalForm.gender as keyof typeof reverseGenderMap] || genderMap[personalForm.gender as keyof typeof genderMap]}
                        onChange={(selected) =>
                            setPersonalForm({
                                ...personalForm,
                                gender: genderMap[selected as keyof typeof genderMap]
                            })
                        }
                        widthButton="100%"
                    />


                </QN_FormRow>
                <QN_FormRow>
                    <QN_Input2
                        label='Tempo de acompanhamento'
                        value={String(nutritionalInfo.followUpTime)}
                        onChange={e =>
                            setNutritionalInfo({
                                ...nutritionalInfo,
                                firstConsultation: e.target.value
                            })
                        }
                        removeStyle={true}
                    />
                </QN_FormRow>
            </QN_Form>
            <QN_Form title="Detalhamento" >
                <QN_FormRow>
                </QN_FormRow>
            </QN_Form>

            <QN_Form title='Contato'>
                <QN_FormRow>
                    <QN_Input2
                        label='E-mail'
                        value={contactForm.email}
                        onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                    />
                    <QN_Input2
                        label='Telefone/Celular'
                        value={contactForm.phone}
                        onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                        mask='(##)#####-####'
                        placeHolder='(xx)xxxxx-xxxx'
                    />
                    <QN_Button
                        colorStyle='blue'
                    >
                        Alterar senha?
                    </QN_Button>
                </QN_FormRow>
            </QN_Form>
            <QN_Form title='Endereço'>
                <QN_FormRow>
                    <QN_Input2
                        label='CEP'
                        value={addressForm.cep}
                        onChange={handleCepChange}
                        mask='#####-###'
                    />
                    <QN_Input2
                        label='Número'
                        value={addressForm.number as string}
                        onChange={e => setAddressForm({ ...addressForm, number: e.target.value })}
                    />
                    <QN_Input2
                        label='Complemento'
                        value={addressForm.complement}
                        onChange={e => setAddressForm({ ...addressForm, complement: e.target.value })}
                        onTab={(e) => {
                            if (isValidCep) nameInputRef.current?.focus()
                            else streetInputRef.current?.focus()
                        }}
                    />
                </QN_FormRow>
                <QN_FormRow>
                    <QN_Input2
                        ref={streetInputRef}
                        label='Rua'
                        value={addressForm.street}
                        onChange={e => setAddressForm({ ...addressForm, street: e.target.value })}
                        disabled={isValidCep}
                    />
                </QN_FormRow>
                <QN_FormRow>
                    <QN_Input2
                        label='Bairro'
                        value={addressForm.hood}
                        onChange={e => setAddressForm({ ...addressForm, hood: e.target.value })}
                        disabled={isValidCep}
                    />
                    <QN_Input2
                        label='Cidade'
                        value={addressForm.city}
                        onChange={e => setAddressForm({ ...addressForm, city: e.target.value })}
                        disabled={isValidCep}
                    />
                    <QN_Input2
                        label='Estado'
                        value={addressForm.state}
                        onChange={e => setAddressForm({ ...addressForm, state: e.target.value })}
                        disabled={isValidCep}
                        onTab={(e) => nameInputRef.current?.focus()}
                    />
                </QN_FormRow>
            </QN_Form>
        </div>
    );
}
