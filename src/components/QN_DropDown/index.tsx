import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

interface QN_DropDownProps {
    items: [
        {
            key: string,
            label: string
        }
    ],
    name: string
    widthButton?: string
    widthOptions?: string
    bgColorOption?: string
    bgColorButton?: string
    colorFontButton?: string
    colorFontOptions?: string
}

export default function QN_DropDown({
    items, name, widthButton = 'fit-content', widthOptions = 'fit-content', bgColorButton = 'white', bgColorOption = 'white', colorFontButton = 'black', colorFontOptions = 'black' }: QN_DropDownProps) {

    return (
        <Dropdown style={{ width: `${widthOptions}`, color: `${colorFontOptions}` }}>
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
                    {name}
                </Button>
            </DropdownTrigger>
            <DropdownMenu items={items} >
                {(item) => (
                    <DropdownItem
                        key={item.key}
                        style={{ backgroundColor: `${bgColorOption}` }}
                    >
                        {item.label}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
}