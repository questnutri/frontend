import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

interface QN_DropDownProps {
    items: string[],
    label: string
    widthButton?: string
    widthOptions?: string
    bgColorOption?: string
    bgColorButton?: string
    colorFontButton?: string
    colorFontOptions?: string
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
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
    value, setValue,
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
            <Dropdown style={{ width: `${widthOptions}`, color: `${colorFontOptions}` }} isDisabled={disabled}>
                <DropdownTrigger
                    style={{
                        width: `${widthButton}`,
                        backgroundColor: `${bgColorButton}`,
                        color: `${colorFontButton}`
                    }}
                >
                    <Button
                        variant="bordered"
                    >
                        {value}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu >
                    {items.map((item, index) => (
                        <DropdownItem
                            key={index}
                            onClick={() => {
                                setValue(item), console.log(value);
                            }}
                            isReadOnly={readyOnly}
                        >
                            {item}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}