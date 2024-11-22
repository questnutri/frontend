'use client'
import { Input } from "@nextui-org/input"
import { useState } from "react"

interface QN_Input2Props {
    label: string
    width?: string
    type?: string
    value: string
    validation?: (value: string) => boolean
    format?: (value: string) => string
    errorMessage?: string,
    readyOnly?: boolean,
    disabled?: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
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
    readyOnly
}: QN_Input2Props) {
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e)
        if (validation) setShowErrorMessage(!validation(e.target.value))
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
                className="h-2"
                placeholder={`Digite seu ${label}`}
                value={value}
                isInvalid={showErrorMessage}
                errorMessage={errorMessage}
                isDisabled={disabled}
                isReadOnly={readyOnly}
                onChange={handleOnChange}
            />
        </div>
    );
}
