
import { Textarea } from "@nextui-org/react"

interface QN_TextAreaProps {
    label?: string,
    value: string,
    minRows?: number,
    maxRows?: number,
    disabled?: boolean
    readOnly?: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string,
    fontSizeLabel?: string,
    fontColorLabel?: string,
    fontWeightLabel?: string,
    isSelected?: boolean
    setIsSelected?: (value: boolean) => void
}

export default function QN_TextArea({
    label,
    minRows = 3,
    maxRows = 3,
    value,
    disabled,
    readOnly,
    onChange,
    placeholder,
    isSelected = false,
    setIsSelected,
    fontSizeLabel = '15px',
    fontColorLabel = 'black',
    fontWeightLabel = '500'
}: QN_TextAreaProps) {

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: `100%`,
                gap: '3px',
                padding: "4px",
                borderRadius: "5px",
                resize: "none",
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                height: '100%'
            }}
        >
            <span
                style={{
                    fontSize: `${fontSizeLabel}`,
                    marginLeft: '8px',
                    color: `${fontColorLabel}`,
                    fontWeight: `${fontWeightLabel}`,
                }}
            >
                {label}
            </span>

            <Textarea
                placeholder={placeholder}
                variant="bordered"
                minRows={isSelected ? minRows * 2 : minRows}
                maxRows={isSelected ? maxRows * 2 : maxRows}
                onChange={onChange}
                value={value}
                isDisabled={disabled}
                isReadOnly={readOnly}
                classNames={{
                    inputWrapper: ['bg-white border-black hover:border-black focus:border-black'],
                    input: ['text-black']
                }}
                onFocus={() => setIsSelected?.(true)}
                onBlur={() => setIsSelected?.(false)}
            />
        </div>
    );
}
