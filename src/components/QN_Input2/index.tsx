'use client'
import { Input } from "@nextui-org/input"
import { useState } from "react"

interface QN_Input2Props {
    label?: string
    width?: string
    type?: string
    value: string
    validation?: (value: string) => boolean
    format?: (value: string) => string
    errorMessage?: string
    readyOnly?: boolean
    disabled?: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeHolder?: string
    removeStyle?: boolean
    fontSize?: 'text-base' | 'text-lg' | 'text-xl'
    fontWeight?: 'font-normal' | 'font-medium' | 'font-bold' | 'font-extrabold'
}

export default function QN_Input2({
    label,
    width = "100%",
    type = "text",
    value,
    errorMessage = "Campo inválido!",
    onChange,
    validation,
    format,
    disabled,
    readyOnly,
    placeHolder,
    removeStyle = false,
    fontSize,
    fontWeight
}: QN_Input2Props) {
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e)
        if (validation) setShowErrorMessage(!validation(e.target.value))
    }

    const isReadOnly = removeStyle ? true : readyOnly

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
                    color: "black",
                    fontWeight: "500",
                }}
            >
                {label}
            </span>
            <Input
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
                style={{ backgroundColor: 'white' }}
                classNames={
                    removeStyle ? {
                        input: [`bg-white !bg-white text-black ${fontSize} ${fontWeight}`],
                        inputWrapper: ["bg-white !bg-white shadow-none border-0 hover:border-0 focus:border-0 text-black"]
                    } : undefined
                }
            />
        </div>
    );
}