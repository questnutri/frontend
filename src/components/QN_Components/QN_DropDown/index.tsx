import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react"

type QN_DropDownItem = {
    label: string
    value: string
}

interface QN_DropDownProps {
    buttonConfig?: {
        width?: string
        backgroundColor?: string
        textColor?: string
        textAlignX?: 'start' | 'center' | 'end'
        borderRadius?: string
    }

    optionsConfig?: {
        width?: string
        backgroundColor?: string
        textColor?: string
    }

    items: QN_DropDownItem[]
    replaceButtonToDots?: boolean
    label?: string
    value: string
    onChange: (value: string) => void
    disabled?: boolean
    readyOnly?: boolean
    onTab?: (e: React.KeyboardEvent<HTMLButtonElement>) => void
}

export default function QN_DropDown({
    items,
    label,
    replaceButtonToDots = false,
    buttonConfig,
    optionsConfig,
    value,
    disabled,
    readyOnly,
    onChange,
    onTab,
}: QN_DropDownProps) {

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Tab' && onTab) {
            e.preventDefault()
            onTab(e)
        }
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: `100%`,
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
            <Dropdown isDisabled={disabled}>
                <DropdownTrigger>
                    {replaceButtonToDots ? (
                        <Button
                            isIconOnly
                            variant="light"
                            style={{
                                width: buttonConfig?.width || 'fit-content',
                                backgroundColor: buttonConfig?.backgroundColor,
                                color: buttonConfig?.textColor,
                                borderColor: '#E4E4E7'
                            }}
                        >
                            <VerticalDotsIcon />
                        </Button>
                    ) : (
                        <Button
                            variant="bordered"
                            style={{
                                width: buttonConfig?.width || 'fit-content',
                                backgroundColor: buttonConfig?.backgroundColor,
                                color: buttonConfig?.textColor,
                                justifyContent: buttonConfig?.textAlignX || 'center',
                                borderRadius: buttonConfig?.borderRadius || '8px',
                                borderColor: '#E4E4E7'
                            }}
                            onKeyDown={handleKeyDown}
                        >
                            {items.find(item => item.value === value)?.label || 'Selecione'}
                        </Button>
                    )}
                </DropdownTrigger>
                <DropdownMenu
                    style={{
                        width: optionsConfig?.width || 'fit-content',
                        backgroundColor: optionsConfig?.backgroundColor,
                        color: optionsConfig?.textColor
                    }}
                >
                    {items.map((item, index) => (
                        <DropdownItem
                            key={index}
                            onClick={() => !readyOnly && onChange(item.value)}
                        >
                            {item.label}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

interface VerticalDotsIconProps {
    size?: number
}

const VerticalDotsIcon = ({ size = 24 }: VerticalDotsIconProps) => (
    <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height={size}
        role="presentation"
        viewBox="0 0 24 24"
        width={size}
    >
        <path
            d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
            fill="currentColor"
        />
    </svg>
)
