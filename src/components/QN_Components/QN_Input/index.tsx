'use client'
import { Input } from "@nextui-org/input"
import { useState } from "react"

interface QN_InputProps {
    //Required Fields
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void

    //External control
    isInvalid?: boolean

    //General HTML
    ref?: React.Ref<HTMLInputElement>
    type?: string
    version?: 1 | 2

    //Internal Structure
    width?: string
    height?: string
    padding?: string
    backgroundColor?: string

    //Text
    fontSize?: string
    fontWeight?: 'font-normal' | 'font-medium' | 'font-bold' | 'font-extrabold'
    textAlign?: 'start' | 'end' | 'center' | 'justify'
    color?: '#55b7fe' | 'black' | 'white'
    mask?: string

    //Options
    required?: boolean
    clearable?: boolean
    readyOnly?: boolean
    disabled?: boolean
    placeHolder?: string
    removeStyle?: boolean
    cursor?: string,
    withBorder?: boolean


    //Attachments
    label?: string
    errorMessage?: string //Interacts with external control IsInvalid
    startContent?: React.ReactNode
    endContent?: React.ReactNode

    //Other Functions
    validation?: (value: string) => boolean
    format?: (value: string) => string
    onTab?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export default function QN_Input({
    //Required Fields
    value,
    onChange,

    //External control
    isInvalid = false,

    //General HTML
    ref,
    type = "text",
    version: inputVersion = 2,

    //Internal Structure
    width = "100%",
    height,
    padding,
    backgroundColor,

    //Text
    fontSize,
    fontWeight,
    textAlign = 'start',
    color = 'black',
    mask,

    //Options
    required = false,
    clearable,
    readyOnly,
    disabled,
    placeHolder,
    removeStyle = false,
    cursor='auto',
    withBorder = false,

    //Attachments
    label,
    errorMessage = "Campo inválido!",
    startContent,
    endContent,

    //Other Functions
    validation,
    format,
    onTab,
    onEnter,
}: QN_InputProps) {
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const isReadOnly = removeStyle ? true : readyOnly

    const colorMap = {
        'white': 'text-white',
        'black': 'text-black',
        '#55b7fe': 'text-[#55b7fe]'
    }

    const textColorClass = colorMap[color] || 'text-black'
    const cursorClass = isReadOnly ? 'cursor-text' : 'cursor-default'

    //Controls the input mask
    const applyMask = (rawValue: string, mask: string): string => {
        let formattedValue = ''
        let rawIndex = 0

        for (let i = 0; i < mask.length; i++) {
            if (rawIndex >= rawValue.length) break
            if (mask[i] === '#') {
                formattedValue += rawValue[rawIndex]
                rawIndex++
            } else {
                // Adiciona os caracteres fixos diretamente
                formattedValue += mask[i]
            }
        }

        return formattedValue
    }

    //Controls the input change dealing with the mask
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (mask) {
            const inputElement = e.target
            const rawValue = e.target.value.replace(/[^0-9]/g, '') // Remove caracteres que não são números
            const oldMaskedValue = value || ''
            const maskedValue = applyMask(rawValue, mask)

            const cursorPosition = inputElement.selectionStart || 0
            let adjustedCursorPosition = cursorPosition

            // Ajusta a posição do cursor ao inserir ou excluir caracteres
            if (maskedValue.length > oldMaskedValue.length) {
                // Inserção: pula caracteres fixos da máscara
                for (let i = cursorPosition - 1; i < mask.length; i++) {
                    if (mask[i] !== '#' && maskedValue[i]) {
                        adjustedCursorPosition++
                    } else {
                        break
                    }
                }
            } else if (maskedValue.length < oldMaskedValue.length) {
                // Exclusão: retorna sobre caracteres fixos
                for (let i = cursorPosition - 1; i >= 0; i--) {
                    if (mask[i] !== '#' && maskedValue[i] !== rawValue[i]) {
                        adjustedCursorPosition--
                    } else {
                        break
                    }
                }
            }

            // Atualiza o valor do input
            onChange({ ...e, target: { ...e.target, value: maskedValue } })
            if (validation) setShowErrorMessage(!validation(maskedValue))

            setTimeout(() => {
                // Define a nova posição do cursor
                inputElement.setSelectionRange(adjustedCursorPosition, adjustedCursorPosition)
            }, 0)
        } else {
            onChange(e)
        }
    }

    //Controls custom keyboard properties
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Tab' && onTab) {
            e.preventDefault()
            onTab(e)
        } else if (e.key === 'Enter' && onEnter) {
            e.preventDefault()
            onEnter(e)
        }
    }

    //Above functions controls input version 1 password state
    const [inputType, setInputType] = useState(type)
    const togglePassword = (e: React.MouseEvent) => {
        setInputType(inputType === 'password' ? 'text' : 'password')
    }
    const handleClear = () => {
        if (clearable) {
            onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)
        }
    }

    switch (inputVersion) {
        case 1:
            return (
                <div
                    style={{
                        // boxShadow: '0 3px 4px rgba(0, 0, 0, 0.4)',
                        backgroundColor: !isInvalid ? '#57b5fb' : '#FEE7EF',
                        borderRadius: '15px',
                        width: '100%',
                        color: 'black'
                    }}
                >
                    <Input
                        ref={ref}
                        label={label}
                        type={inputType}
                        isRequired={required}
                        isClearable={clearable}
                        onClear={handleClear}
                        isInvalid={isInvalid}
                        errorMessage={errorMessage}
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
        case 2: default:
            return (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        width: `${width}`,
                    }}
                >
                    <span
                        style={{
                            fontSize: "15px",
                            marginLeft: "8px",
                            color: color,
                            fontWeight: "500",
                        }}
                    >
                        {label}{required && <span style={{color: 'red', paddingLeft: '1px'}}>*</span>}
                    </span>
                    <Input
                        value={value}
                        onChange={handleOnChange}

                        ref={ref}
                        type={type}

                        style={{
                            padding: '0px',
                            height,
                            textAlign,
                            backgroundColor: 'white',
                            cursor,
                            fontSize,
                        }}

                        isInvalid={showErrorMessage}
                        errorMessage={errorMessage}

                        variant="bordered"
                        radius="sm"

                        isRequired={required}
                        isReadOnly={isReadOnly}
                        isDisabled={disabled}
                        placeholder={placeHolder}
                        classNames={
                            removeStyle ? {
                                input: [`bg-white !bg-white ${textColorClass} ${fontSize} ${fontWeight} ${cursorClass}`],
                                inputWrapper: [`shadow-none border-0 hover:border-0 focus:border-0 text-black ${cursorClass}`],
                            } : withBorder ? {
                                input: ['bg-neutral-50 text-black'],
                                inputWrapper: ['bg-neutral-50 border-solid border-gray-400 border']
                            } : undefined
                        }

                        startContent={startContent}
                        endContent={endContent}

                        onKeyDown={handleKeyDown}
                    />
                </div>
            )
    }

}