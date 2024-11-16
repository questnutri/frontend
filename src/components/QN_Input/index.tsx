'use client'
import { Input } from '@nextui-org/react'
import React, { useState } from 'react'

export interface QN_InputProps {
    label: string
    type?: 'text' | 'email' | 'password' | 'number' | 'tel'
    required?: boolean
    clearable?: boolean
    invalid?: boolean
    invalidMessage?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    //inputController: React.Dispatch<React.SetStateAction<{ value: string; invalid: boolean; invalidMessage: string }>>
}

export default function QN_Input({ label, type = 'text', value, onChange, required, clearable, invalid, invalidMessage}: QN_InputProps) {
    const [inputType, setInputType] = useState(type)

    const togglePassword = (e: React.MouseEvent) => {
        setInputType(inputType === 'password' ? 'text' : 'password')
    }

    const handleClear = () => {
        if (clearable) {
            onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)
        }
    }

    return (
        <Input
            label={label}
            type={inputType}
            isRequired={required}
            isClearable={clearable}
            onClear={handleClear}
            isInvalid={invalid}
            errorMessage={invalidMessage}
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
