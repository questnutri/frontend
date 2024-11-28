'use client'
import QN_DropDown from "@/components/QN_Components/QN_DropDown"
import QN_Form from "@/components/QN_Components/QN_Form"
import QN_FormRow from "@/components/QN_Components/QN_FormRow"
import QN_Input from "@/components/QN_Components/QN_Input"
import { fetchCep } from "@/lib/fetchCep"
import { useEffect, useState } from "react"
import QN_Button from "@/components/QN_Components/QN_Button"
import { fetchNutritionist, updateNutritionist } from "@/lib/fetchNutritionist"
import { INutritionist } from "@/models/Nutritionist.interface"
import { Divider } from "@nextui-org/react"

export default function ProfilePage() {
    const [nutritionist, setNutritionist] = useState<INutritionist | undefined>(undefined)

    const getNutritionist = async () => {
        const res = await fetchNutritionist()
        if (res.status == 200) {
            setNutritionist(res.data)
        }
    }

    useEffect(() => {
        getNutritionist()
    }, [])


    const genderOptions = [
        { label: 'Masculino', value: 'male' },
        { label: 'Feminino', value: 'female' },
        { label: 'Outros', value: 'others' },
    ];

    const [isValidCep, setIsValidCep] = useState(false)

    const handleSaveBtn = (): React.ReactNode => {
        return (
            <QN_Button width='120px' height='32px' onClick={() => {
                acceptNutritionistChanges()
            }}
                noShadow
            >Salvar</QN_Button>
        )
    }
    const acceptNutritionistChanges = async () => {
        await updateNutritionist(nutritionist as INutritionist)
    }

    const denyNutritionistChanges = async () => {
        await getNutritionist()
    }

    const handleNutritionistChange = (field: keyof INutritionist, value: any) => {
        if (nutritionist) {
            setNutritionist({
                ...nutritionist,
                [field]: value
            })
        }
    }

    const handleNutritionistDetailsChange = (field: any, value: any) => {
        if (nutritionist) {
            setNutritionist({
                ...nutritionist,
                details: {
                    ...nutritionist?.details,
                    [field]: value
                }
            })
        }
    }

    const [currentPasswordInput, setCurrentPasswordInput] = useState('')
    const [newPasswordInput1, setNewPasswordInput1] = useState('')
    const [newPasswordInput2, setNewPasswordInput2] = useState('')

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                padding: '20px',
                gap: '10px',
                justifyContent: 'start',
                alignItems: 'center',
                border: 'none',
                borderRadius: '10px',
                height: '100%',
                overflowY: 'auto'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '55%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '20px',
                    alignSelf: 'end',
                    padding: '0px 20px'
                }}
            >
                <h1
                    style={{
                        width: 'fit-content',
                        fontSize: '25px',
                        fontWeight: '600'
                    }}
                >
                    Meu Perfil
                </h1>
            </div>
            <QN_Form
                title="Informações Pessoais"
                formConfig={{
                    border: 'none'
                }}
                actionButton={
                    handleSaveBtn()
                }
            >
                <QN_FormRow >
                    <QN_Input
                        value={nutritionist?.firstName || ''}
                        onChange={e => handleNutritionistChange('firstName', e.target.value)}
                        label="Nome"
                    />
                    <QN_Input
                        value={nutritionist?.lastName || ''}
                        onChange={e => handleNutritionistChange('lastName', e.target.value)}
                        label="Sobrenome"
                    />
                    <QN_Input
                        value={nutritionist?.details?.birth?.toISOString() || new Date().toISOString()}
                        onChange={e => handleNutritionistDetailsChange('birth', e.target.value)}
                        label="Data de Nascimento"
                        type="date"
                    />
                </QN_FormRow>
                <QN_FormRow >
                    <QN_Input
                        value={nutritionist?.details?.rg || ''}
                        onChange={e => handleNutritionistDetailsChange('rg', e.target.value)}
                        label="RG"
                        mask="##.###.###-#"
                    />
                    <QN_Input
                        value={nutritionist?.details?.cpf || ''}
                        onChange={e => handleNutritionistDetailsChange('cpf', e.target.value)}
                        label="CPF"
                        mask="###.###.###-##"
                    />
                    <QN_DropDown
                        items={genderOptions}
                        value={nutritionist?.details?.gender || 'other'}
                        onChange={e => handleNutritionistDetailsChange('gender', e)}
                        buttonConfig={{
                            width: '100%',
                            textAlignX: 'start',
                        }}
                        label="Gênero"
                        optionsConfig={{}}
                    />
                </QN_FormRow>
                <QN_FormRow>
                    <QN_Input
                        value={nutritionist?.details?.cnpj || ''}
                        onChange={e => handleNutritionistDetailsChange('cnpj', e.target.value)}
                        label="CNPJ"
                        mask="##.###.###/####-##"
                    />
                    <QN_Input
                        value={nutritionist?.details?.clinicName || ''}
                        onChange={e => handleNutritionistDetailsChange('clinicName', e.target.value)}
                        label="Nome da clínica"
                    />
                </QN_FormRow>
                <QN_FormRow>
                    <QN_Input
                        value={nutritionist?.details?.crn || ''}
                        onChange={e => handleNutritionistDetailsChange('crn', e.target.value)}
                        label="CRN"
                        mask="####-#"
                    />
                    <QN_Input
                        value={nutritionist?.details?.dateOfIssue?.toISOString() || new Date().toISOString()}
                        onChange={e => handleNutritionistDetailsChange('dateOfIssue', e.target.value)}
                        label="Data de emissão"
                        type="date"
                    />
                </QN_FormRow>
            </QN_Form>
            <Divider />
            <QN_Form
                title="Informações de Contato"
                formConfig={{
                    border: 'none'
                }}
                actionButton={
                    <QN_Button
                    >
                        Salvar
                    </QN_Button>
                }
            >
                <QN_FormRow>
                    <QN_Input
                        value={nutritionist?.email || ''}
                        onChange={e => handleNutritionistChange('email', e.target.value)}
                        label="E-mail"
                    />
                    <QN_Input
                        value={nutritionist?.details?.phone || ''}
                        onChange={e => handleNutritionistChange('email', e.target.value)}
                        label="Telefone"
                    />
                </QN_FormRow>
            </QN_Form>
            <Divider />
            <QN_Form
                title="Trocar de senha"
                formConfig={{
                    border: 'none'
                }}
            >
                <QN_FormRow>
                    <QN_Input
                        label="Senha atual"
                        type='password'
                        value={currentPasswordInput}
                        onChange={e => setCurrentPasswordInput(e.target.value)}

                    />
                    <QN_Input
                        label="Nova senha"
                        type='password'
                        value={newPasswordInput1}
                        onChange={e => setNewPasswordInput1(e.target.value)}

                    />
                    <QN_Input
                        label="Repita nova senha"
                        type='password'
                        value={newPasswordInput2}
                        onChange={e => setNewPasswordInput2(e.target.value)}
                        errorMessage={'As senhas devem ser iguais'}
                        isInvalid={
                            newPasswordInput2.length === newPasswordInput1.length &&
                            newPasswordInput1.trim() !== newPasswordInput2.trim()
                        }
                    />
                    <QN_Button
                        width="100%"
                        marginTop="20px"
                        borderRadius="10px"
                        blocked={
                            currentPasswordInput.trim().length === 0 ||
                            newPasswordInput1.trim() === '' ||
                            newPasswordInput2.trim() === '' ||
                            newPasswordInput1 !== newPasswordInput2
                        }
                        noShadow
                    >
                        Mudar senha
                    </QN_Button>
                </QN_FormRow>
            </QN_Form>
            {/* <QN_Form
                title="Endereço"
                formConfig={{
                    border: 'none'
                }}
                actionButton={
                    <QN_Button
                    >
                        Salvar
                    </QN_Button>
                }

            >
                <QN_FormRow>
                    <QN_Input
                        value={addressForm.cep}
                        onChange={handleCepChange}
                        label="CEP"
                        mask="#####-###"
                    />
                    <QN_Input
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
                        label="Número"
                    />
                    <QN_Input
                        value={addressForm.complement}
                        onChange={e => setAddressForm({ ...addressForm, complement: e.target.value })}
                        label="Complemento"
                    />
                </QN_FormRow>
                <QN_FormRow>
                    <QN_Input
                        value={addressForm.street}
                        onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                        label="Rua"
                        disabled={true}
                    />
                </QN_FormRow>
                <QN_FormRow>
                    <QN_Input
                        value={addressForm.hood}
                        onChange={(e) => setAddressForm({ ...addressForm, hood: e.target.value })}
                        label="Bairro"
                        disabled={true}

                    />
                    <QN_Input
                        value={addressForm.street}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        label="Cidade"
                        disabled={true}
                    />
                    <QN_Input
                        value={addressForm.street}
                        onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                        label="Estado"
                        disabled={true}
                    />
                </QN_FormRow>

            </QN_Form> */}
        </div>
    )

}