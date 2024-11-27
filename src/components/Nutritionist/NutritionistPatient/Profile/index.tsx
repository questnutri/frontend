'use client'
import { useEffect, useRef, useState } from 'react'
import QN_Form from '@/components/QN_Components/QN_Form'
import QN_FormRow from '@/components/QN_Components/QN_FormRow'
import { useNutritionistPatient } from '@/context/modal.patient.context'
import QN_Input from '@/components/QN_Components/QN_Input'
import QN_Button from '@/components/QN_Components/QN_Button'
import QN_DropDown from '@/components/QN_Components/QN_DropDown'
import { fetchCep } from '@/lib/fetchCep'
import { updateOnePatient } from '@/lib/fetchPatients'



export default function QN_NutritionistPatient_ProfilePage() {
    const { patient, setModalPatient } = useNutritionistPatient()

    const updatePatientBtn = (data: any): React.ReactNode => {
        return (
            <QN_Button width='120px' height='32px' onClick={() => {
                updateOnePatient(patient?._id as string, data)
                setModalPatient(patient!._id)
            }}
                noShadow
            >Salvar</QN_Button>
        )
    }

    const [personalForm, setPersonalForm] = useState({
        firstName: patient?.firstName || '',
        lastName: patient?.lastName || '',
        birth: patient?.details?.birth ? new Date(patient.details.birth).toISOString().split('T')[0] : '',
        gender: patient?.details?.gender || '',
        height: patient?.details?.height || 0,
        rg: patient?.details?.rg || '',
        cpf: patient?.details?.cpf || '',
    })

    const [nutritionalInfo, setNutritionalInfo] = useState({
        followUpTime: calculateFollowUpTime(new Date(patient?.createdAt).toISOString().split('T')[0]),
        firstConsultation: '',
        lastConsultation: ''
    })

    const [contactForm, setContactForm] = useState({
        email: patient?.email || '',
        phone: patient?.details?.phone || '',
    })


    const checkIsText = (texto: string) => {
        const regex = /[^a-zA-Záéíóúãõâêîôûç\s]/
        return !regex.test(texto)
    }

    function calculateFollowUpTime(createdAt: string): number {
        const currentDate = new Date()
        const dateObj = new Date(createdAt)

        const diffEmMs = currentDate.getTime() - dateObj.getTime()
        const diffEmDias = diffEmMs / (1000 * 3600 * 24)

        return Math.floor(diffEmDias)
    }

    const cleanAddress = {
        street: '',
        number: 0,
        complement: '',
        cep: '',
        hood: '',
        city: '',
        state: ''
    }

    const [addressForm, setAddressForm] = useState({
        street: patient?.details?.address?.street || '',
        number: patient?.details?.address?.number || 0,
        complement: patient?.details?.address?.complement || '',
        cep: patient?.details?.address?.cep || '',
        hood: patient?.details?.address?.hood || '',
        city: patient?.details?.address?.city || '',
        state: patient?.details?.address?.state || '',
    })

    const [isValidCep, setIsValidCep] = useState(false)

    useEffect(() => {
        const checkCep = async () => {
            const data = await fetchCep(addressForm.cep)
            if(data) {
                setIsValidCep(true)
            } else {
                setIsValidCep(false)
            }
        }

        if (addressForm.cep !== '') {
            checkCep()
        }
    }, [])
    
    const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddressForm({ ...addressForm, cep: e.target.value })
        const data = await fetchCep(e.target.value)
        if (data) {
            setIsValidCep(true)
            setAddressForm({
                ...addressForm,
                cep: e.target.value,
                number: addressForm.number,
                complement: addressForm.complement,
                ...data
            })
        } else {
            setIsValidCep(false)
            setAddressForm({
                ...cleanAddress,
                cep: e.target.value,
                number: addressForm.number,
                complement: addressForm.complement
            })
        }
    }

    const genderOptions = [
        {
            label: 'Masculino',
            value: 'male'
        },
        {
            label: 'Feminino',
            value: 'female'
        },
        {
            label: 'Outros',
            value: 'others'
        }
    ]

    const stateOptions = [
        { label: 'AC', value: 'AC' },
        { label: 'AL', value: 'AL' },
        { label: 'AP', value: 'AP' },
        { label: 'AM', value: 'AM' },
        { label: 'BA', value: 'BA' },
        { label: 'CE', value: 'CE' },
        { label: 'DF', value: 'DF' },
        { label: 'ES', value: 'ES' },
        { label: 'GO', value: 'GO' },
        { label: 'MA', value: 'MA' },
        { label: 'MT', value: 'MT' },
        { label: 'MS', value: 'MS' },
        { label: 'MG', value: 'MG' },
        { label: 'PA', value: 'PA' },
        { label: 'PB', value: 'PB' },
        { label: 'PR', value: 'PR' },
        { label: 'PE', value: 'PE' },
        { label: 'PI', value: 'PI' },
        { label: 'RJ', value: 'RJ' },
        { label: 'RN', value: 'RN' },
        { label: 'RS', value: 'RS' },
        { label: 'RO', value: 'RO' },
        { label: 'RR', value: 'RR' },
        { label: 'SC', value: 'SC' },
        { label: 'SP', value: 'SP' },
        { label: 'SE', value: 'SE' },
        { label: 'TO', value: 'TO' }
    ]

    const nameInputRef = useRef<HTMLInputElement>(null)
    const streetInputRef = useRef<HTMLInputElement>(null)

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                padding: "20px",
                gap: '20px',
                height: '100%',
                overflowY: 'auto'
            }}
        >
            <QN_Form title="Informações Pessoais" actionButton={
                updatePatientBtn({
                    firstName: personalForm.firstName,
                    lastName: personalForm.lastName,
                    details: {
                        rg: personalForm.rg,
                        cpf: personalForm.cpf,
                        height: personalForm.height,
                        birth: new Date(personalForm.birth),
                        gender: personalForm.gender,
                    }
                })
            }>
                <QN_FormRow>
                    <QN_Input
                        ref={nameInputRef}
                        label='Nome'
                        value={personalForm.firstName}
                        onChange={e => setPersonalForm({
                            ...personalForm,
                            firstName: e.target.value
                        })}
                        validation={checkIsText}
                    />
                    <QN_Input
                        label='Sobrenome'
                        value={personalForm.lastName}
                        onChange={e => setPersonalForm({
                            ...personalForm,
                            lastName: e.target.value
                        })}
                        validation={checkIsText}
                    />
                    <QN_Input
                        label='Data de nascimento'
                        value={personalForm.birth.toLocaleString()}
                        onChange={e => setPersonalForm({
                            ...personalForm,
                            birth: e.target.value
                        })}
                        type='date'
                    />
                </QN_FormRow>
                <QN_FormRow>
                    <QN_Input
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
                    <QN_Input
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
                    <QN_Input
                        label='Altura (metros)'
                        value={`${personalForm.height}`}
                        onChange={(e) => {
                            const height = parseFloat(e.target.value)
                            if (isNaN(height)) {
                                setPersonalForm({
                                    ...personalForm,
                                    height: 0,
                                })
                            } else {
                                setPersonalForm({
                                    ...personalForm,
                                    height: parseFloat(e.target.value),
                                })
                            }
                        }}
                        mask='#.##'
                    />
                    <QN_DropDown
                        label="Gênero"
                        items={genderOptions}
                        value={personalForm.gender}
                        onChange={(selected) =>
                            setPersonalForm({
                                ...personalForm,
                                gender: selected
                            })
                        }
                        buttonConfig={{
                            textAlignX: 'start',
                            width: '100%'
                        }}
                    />
                    <QN_Input
                        label='Tempo de acompanhamento'
                        value={`${String(nutritionalInfo.followUpTime)} dias`}
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
            <QN_Form title='Contato' actionButton={
                updatePatientBtn({
                    email: contactForm.email,
                    details: {
                        phone: contactForm.phone
                    }
                })
            }>
                <QN_FormRow>
                    <QN_Input
                        label='E-mail'
                        value={contactForm.email}
                        onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                    />
                    <QN_Button
                        colorStyle='blue'
                        width='100%'
                        height='40px'
                        marginTop='22px'
                        noShadow
                    >
                        Enviar redefinição de senha
                    </QN_Button>
                    <QN_Input
                        label='Telefone/Celular'
                        value={contactForm.phone}
                        onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                        mask='(##) # ####-####'
                        placeHolder='(xx) xxxxx-xxxx'
                    />
                </QN_FormRow>
            </QN_Form>
            <QN_Form title='Endereço' actionButton={
                updatePatientBtn({
                    details: {
                        address: {
                            cep: addressForm.cep,
                            number: addressForm.number,
                            complement: addressForm.complement,
                            street: addressForm.street,
                            hood: addressForm.hood,
                            city: addressForm.city,
                            state: addressForm.state,
                        }
                    }
                })
            }>
                <QN_FormRow>
                    <QN_Input
                        label='CEP'
                        value={addressForm.cep}
                        onChange={handleCepChange}
                        mask='#####-###'
                    />
                    <QN_Input
                        label='Número'
                        value={`${addressForm.number}`}
                        onChange={(e) => {
                            const addrNumber = parseFloat(e.target.value)
                            if (isNaN(addrNumber)) {
                                setAddressForm({
                                    ...addressForm,
                                    number: 0,
                                })
                            } else {
                                setAddressForm({
                                    ...addressForm,
                                    number: addrNumber,
                                })
                            }
                        }}
                    />
                    <QN_Input
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
                    <QN_Input
                        ref={streetInputRef}
                        label='Rua'
                        value={addressForm.street}
                        onChange={e => setAddressForm({ ...addressForm, street: e.target.value })}
                        disabled={isValidCep}
                    />
                </QN_FormRow>
                <QN_FormRow>
                    <QN_Input
                        label='Bairro'
                        value={addressForm.hood}
                        onChange={e => setAddressForm({ ...addressForm, hood: e.target.value })}
                        disabled={isValidCep}
                    />
                    <QN_Input
                        label='Cidade'
                        value={addressForm.city}
                        onChange={e => setAddressForm({ ...addressForm, city: e.target.value })}
                        disabled={isValidCep}
                    />
                    <QN_DropDown
                        label="Estado"
                        items={stateOptions}
                        value={addressForm.state}
                        onChange={(selected) =>
                            setAddressForm({
                                ...addressForm,
                                state: selected
                            })
                        }
                        disabled={isValidCep}
                        buttonConfig={{
                            width: '100%'
                        }}
                        onTab={(e) => nameInputRef.current?.focus()}
                    />
                </QN_FormRow>
            </QN_Form>
        </div >
    );
}
