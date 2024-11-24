import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react"

interface QN_DropDownProps {
    items: string[]
    label?: string
    widthButton?: string
    widthOptions?: string
    bgColorOption?: string
    bgColorButton?: string
    colorFontButton?: string
    colorFontOptions?: string
    value: string
    onChange: (value: string) => void // Alterado para aceitar o valor diretamente
    disabled?: boolean
    readyOnly?: boolean
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
    onChange,
    disabled,
    readyOnly
}: QN_DropDownProps) {
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
                    >
                        {value}
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
                            onClick={() => !readyOnly && onChange(item)} // Usa onClick para capturar o valor
                        >
                            {item}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}
