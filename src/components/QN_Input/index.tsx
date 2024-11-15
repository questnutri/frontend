'use client'
import { Input } from '@nextui-org/react'
import { useState } from 'react'

export interface QN_InputProps {
    label: string
    type?: 'text' | 'email' | 'password' | 'number' | 'tel'
    required?: boolean
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function QN_Input({ label, type = 'text', value, onChange, required }: QN_InputProps) {
    const [inputType, setInputType] = useState(type)

    const togglePassword = () => {
        setInputType(inputType === 'password' ? 'text' : 'password')
    }

    return (
        <Input
            isRequired={required}
            label={label}
            type={inputType}
            value={value}
            onChange={onChange}
            endContent={
                type == 'password' && (
                    <button
                        type='button'
                        onClick={togglePassword}
                    >
                        <img
                            src={`icons/${inputType == 'password' ? 'opened' : 'closed'}-eye2.png`}
                            alt="toggle password visibility"
                            width={20}
                            height={20}
                        />
                    </button>
                )
            }
        />
    )
}
