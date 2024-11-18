'use client'
import { Input } from '@nextui-org/react'
import React, { useState } from 'react'

export interface QN_InputProps {
    ref?: React.Ref<HTMLInputElement>
    label: string
    type?: 'text' | 'email' | 'password' | 'number' | 'tel'
    required?: boolean
    clearable?: boolean
    invalid?: boolean
    invalidMessage?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onTab?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    //inputController: React.Dispatch<React.SetStateAction<{ value: string; invalid: boolean; invalidMessage: string }>>
}

export default function QN_Input({ ref, label, type = 'text', required, clearable, invalid, invalidMessage, value, onChange, onTab, onEnter }: QN_InputProps) {
    const [inputType, setInputType] = useState(type)

    const togglePassword = (e: React.MouseEvent) => {
        setInputType(inputType === 'password' ? 'text' : 'password')
    }

    const handleClear = () => {
        if (clearable) {
            onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Tab' && onTab) {
            e.preventDefault()
            onTab(e)
        } else if (e.key === 'Enter' && onEnter) {
            e.preventDefault()
            onEnter(e)
        }
    }

    return (
        <div style={{ boxShadow: '0 3px 4px rgba(0, 0, 0, 0.4)', backgroundColor: !invalid ? '#57b5fb' : '#FEE7EF', borderRadius: '15px', width: '100%', color: 'black' }}>
            <Input
                ref={ref}
                label={label}
                type={inputType}
                isRequired={required}
                isClearable={clearable}
                onClear={handleClear}
                isInvalid={invalid}
                errorMessage={invalidMessage}
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                endContent={
                    type == 'password' && (
                        <button
                            type='button'
                            onClick={togglePassword}
                            tabIndex={-1}
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
        </div>

    )
}
