import { Textarea } from "@nextui-org/react"

interface QN_TextAreaProps {
    label: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
    minRows: number,
    maxRows: number,
    disabled?: boolean
    readOnly?: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void

}

export default function QN_TextArea({ label, minRows, maxRows, value, setValue, disabled, readOnly, onChange }: QN_TextAreaProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value
        setValue(text)
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: `100%`,
                gap: '3px',
            }}
        >
            <span
                style={{
                    fontSize: '15px',
                    marginLeft: '8px',
                    color: 'black',
                    fontWeight: '500',
                }}
            >
                {label}
            </span>
            <Textarea
                placeholder={`Digite a(o) ${label}`}
                variant="bordered"
                minRows={minRows}
                maxRows={maxRows}
                onChange={handleChange}
                value={value}
                isDisabled={disabled}
                isReadOnly={readOnly}
            />
        </div>
    );
}