
import { Textarea } from "@nextui-org/react"

interface QN_TextAreaProps {
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void

    label?: string,
    minRows?: number,
    maxRows?: number,
    disabled?: boolean
    readOnly?: boolean
    placeholder?: string,
    isSelected?: boolean
    removeStyle?: boolean
    cursor?: string
    height?: string
    textAlign?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent',

    fontSizeLabel?: string
    fontColorLabel?: string
    fontWeightLabel?: string

    labelBtn?: React.ReactNode,
    labelMargin?: string

    onClick?: () => void
    setIsSelected?: (value: boolean) => void
}

export default function QN_TextArea({
    value,
    onChange,

    label,
    minRows = 3,
    maxRows = 3,
    disabled,
    readOnly,
    placeholder,
    isSelected = false,
    removeStyle,
    cursor = 'auto',
    textAlign = 'start',
    height,

    fontSizeLabel = '15px',
    fontColorLabel = 'black',
    fontWeightLabel = '500',

    labelBtn,
    labelMargin,

    onClick,
    setIsSelected,
}: QN_TextAreaProps) {

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: `100%`,
                borderRadius: "5px",
                resize: "none",
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                height: '100%'
            }}
        >


            <div style={{height: '100%', display: 'flex', flexDirection: "row", justifyContent: 'space-between', width: '100%'}}>
                <span
                    style={{
                        fontSize: fontSizeLabel,
                        color: `${fontColorLabel}`,
                        fontWeight: `${fontWeightLabel}`,
                        marginLeft: '8px',
                        width: '100%',
                    }}
                >
                    {label}
                </span>
                {labelBtn}
            </div>


            <Textarea
                placeholder={placeholder}
                variant="bordered"
                minRows={isSelected ? minRows * 2 : minRows}
                maxRows={isSelected ? maxRows * 2 : maxRows}
                onChange={onChange}
                value={value}
                isDisabled={disabled}
                isReadOnly={readOnly}
                onClick={onClick}
                style={removeStyle ? {
                    color: '#55b7fe',
                    fontSize: '14px',
                    fontWeight: '600',
                    border: 'none',
                    backgroundColor: 'white',
                    boxShadow: 'none',
                    cursor,
                    caretColor: 'white',
                    textAlign,
                    height,
                } : {
                    border: 'none',
                    height,
                    textAlign
                }}
                onMouseOver={(e) => e.currentTarget.style.border = 'none'} // hover:border-0
                classNames={
                    removeStyle ? {
                        inputWrapper: [`bg-white !bg-white shadow-none border-0 hover:border-0 focus:border-0 text-black`]
                    } : {
                        inputWrapper: ['bg-white'],
                        input: ['text-black']
                    }
                }
            />
        </div>
    );
}
