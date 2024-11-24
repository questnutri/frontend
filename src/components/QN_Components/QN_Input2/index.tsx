'use client'
import { Input } from "@nextui-org/input"
import { useState } from "react"

interface QN_Input2Props {
    ref?: React.Ref<HTMLInputElement>
    label?: string
    width?: string
    height?: string
    type?: string
    value: string
    clearable?: boolean
    errorMessage?: string
    readyOnly?: boolean
    disabled?: boolean
    placeHolder?: string
    removeStyle?: boolean
    fontSize?: 'text-base' | 'text-lg' | 'text-xl'
    fontWeight?: 'font-normal' | 'font-medium' | 'font-bold' | 'font-extrabold'
    cursor?: boolean,
    color?: '#55b7fe' | 'black' | 'white'
    startContent?: React.ReactNode
    padding?: string
    textAlign?: 'start' | 'end' | 'center' | 'justify'
    mask?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    validation?: (value: string) => boolean
    format?: (value: string) => string
    onTab?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export default function QN_Input2({
    ref,
    label,
    width = "100%",
    height,
    type = "text",
    value,
    errorMessage = "Campo inválido!",
    onChange,
    validation,
    format,
    onTab,
    onEnter,
    disabled,
    readyOnly,
    placeHolder,
    removeStyle = false,
    fontSize,
    fontWeight,
    cursor,
    color = 'black',
    startContent,
    padding,
    textAlign = 'start',
    mask
}: QN_Input2Props) {
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const isReadOnly = removeStyle ? true : readyOnly

    const colorMap = {
        'white': 'text-white',
        'black': 'text-black',
        '#55b7fe': 'text-[#55b7fe]'
    }

    const textColorClass = colorMap[color] || 'text-black'
    const cursorClass = isReadOnly ? 'cursor-text' : 'cursor-default'

    const applyMask = (rawValue: string, mask: string): string => {
        let formattedValue = ''
        let rawIndex = 0
        for (let i = 0; i < mask.length; i++) {
            if (rawIndex >= rawValue.length) break
            if (mask[i] === '#') {
                formattedValue += rawValue[rawIndex]
                rawIndex++
            } else {
                formattedValue += mask[i]
            }
        }
        return formattedValue
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (mask) {
            const inputElement = e.target
            const rawValue = e.target.value.replace(/[^0-9]/g, '')
            const oldMaskedValue = value || ''
            const maskedValue = mask ? applyMask(rawValue, mask) : rawValue

            const cursorPosition = inputElement.selectionStart || 0
            let newCursorPosition = cursorPosition
            for (let i = 0; i < cursorPosition; i++) {
                if (maskedValue[i] !== oldMaskedValue[i] && mask[i] !== '#') {
                    newCursorPosition++
                }
            }
            onChange({ ...e, target: { ...e.target, value: maskedValue } })
            if (validation) setShowErrorMessage(!validation(maskedValue))

            setTimeout(() => {
                inputElement.setSelectionRange(newCursorPosition, newCursorPosition)
            }, 0)
        } else {
            onChange(e)
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
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: `${width}`,
                gap: "3px",
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
                {label}
            </span>
            <Input
                ref={ref}
                type={type}
                variant="bordered"
                radius="sm"
                placeholder={placeHolder}
                value={value}
                isInvalid={showErrorMessage}
                errorMessage={errorMessage}
                isDisabled={disabled}
                isReadOnly={isReadOnly}
                onChange={handleOnChange}
                onKeyDown={handleKeyDown}
                startContent={startContent}
                style={{
                    padding,
                    height,
                    textAlign: textAlign,
                    backgroundColor: 'white',
                    cursor: removeStyle ? 'default' : 'auto',
                }}
                classNames={
                    removeStyle ? {
                        input: [`bg-white !bg-white ${textColorClass} ${fontSize} ${fontWeight} ${cursorClass}`],
                        inputWrapper: [`bg-white !bg-white shadow-none border-0 hover:border-0 focus:border-0 text-black ${cursorClass}`]
                    } : undefined
                }
            />
        </div>
    );
}