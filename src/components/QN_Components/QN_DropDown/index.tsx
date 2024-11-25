import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react"

type QN_DropDownItem = {
    label: string
    value: string
}

interface QN_DropDownProps {
    items: QN_DropDownItem[]
    label?: string
    widthButton?: string
    widthOptions?: string
    bgColorOption?: string
    bgColorButton?: string
    colorFontButton?: string
    colorFontOptions?: string
    value: string
    onChange: (value: string) => void
    disabled?: boolean
    readyOnly?: boolean
    onTab?: (e: React.KeyboardEvent<HTMLButtonElement>) => void
}

export default function QN_DropDown({
    items,
    label,
    widthButton = 'fit-content',
    widthOptions = 'fit-content',
    bgColorButton = 'white',
    bgColorOption = 'white',
    colorFontButton = 'black',
    colorFontOptions = 'black',
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
            <Dropdown isDisabled={disabled}>
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                        style={{
                            width: `${widthButton}`,
                            backgroundColor: `${bgColorButton}`,
                            color: `${colorFontButton}`,
                        }}
                        onKeyDown={handleKeyDown}
                    >
                        {items.find(item => item.value === value)?.label || 'Selecione'}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    style={{
                        width: `${widthOptions}`,
                        backgroundColor: `${bgColorOption}`,
                        color: `${colorFontOptions}`,
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
