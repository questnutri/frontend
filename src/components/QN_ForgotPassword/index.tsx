'use client'
import { useState } from 'react'
import { IoArrowBack } from '../../icons/index'
import QN_Input from '../QN_Input'
import QN_Button from '../QN_Button'

interface QN_ForgotPasswordProps {
    role: string,
    setForgotPassword: React.Dispatch<React.SetStateAction<boolean>>
}

export default function QN_ForgotPassword({ role, setForgotPassword }: QN_ForgotPasswordProps) {

    const [isHovered, setIsHovered] = useState(false)

    const [email, setEmail] = useState({
        value: '',
        invalid: false,
        invalidMessage: '',
    })

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail({
            ...email,
            value: e.target.value,
            invalid: false,
            invalidMessage: ''
        })
    }

    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: 'fit-content',
                    height: '10%',
                    justifyContent: 'start',
                    alignItems: 'center',
                    alignSelf: 'start',
                    gap: '10px',
                    marginTop: '10px',
                    backgroundColor: isHovered ? 'white' : 'transparent',
                    transition: 'background-color 0.3s ease',
                    cursor: 'pointer',
                    borderRadius: '15px',
                    padding: '8px'
                }}
                onClick={() => setForgotPassword(false)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <IoArrowBack
                    size={'30px'}
                    color={isHovered ? '#55B7FE' : 'white'}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                />
                <span
                    style={{
                        fontSize: '17px',
                        fontWeight: '600',
                        color: isHovered ? '#55B7FE' : 'white'
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Voltar
                </span>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '30%',
                    width: '100%'
                }}
            >
                <h1
                    style={{
                        fontSize: '25px',
                        fontWeight: '700',
                        color: 'white'
                    }}
                >
                    Recuperação de senha
                </h1>
            </div>
            <div
                style={{
                    width: '100%',
                    marginBottom: 'auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '50px'
                }}
            >
                <QN_Input label='E-mail' onChange={handleEmailChange} value={email.value} />
                <QN_Button colorStyle='white'>Enviar link de recuperação</QN_Button>
            </div>
        </div>
    )
}