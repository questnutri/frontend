import { CheckboxGroup, Checkbox, Divider } from "@nextui-org/react"

interface QN_CheckBoxGroupProps {
    label: string
    items: { value: string; label?: string }[]
    border?: string
    direction?: 'horizontal' | 'vertical'
    itemLabelPosition?: 'side' | 'above'
    itemLabelMarginLeft?: string
    disabled?: boolean
    readyOnly?: boolean
    customStyle?: boolean
    justifyContent?: string
    alignItems?: string
    value?: string[]
    onChange: (selectedValues: string[]) => void
}

export default function QN_CheckBoxGroup({
    label,
    items,
    border,
    itemLabelPosition = 'side',
    itemLabelMarginLeft,
    direction = 'horizontal',
    disabled,
    readyOnly,
    customStyle = false,
    justifyContent = 'start',
    alignItems = 'start',
    value,
    onChange,
}: QN_CheckBoxGroupProps) {

    const handleChange = (selectedValues: string[]) => {
        onChange(selectedValues)
    }

    return (
        <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center' }}>
            <span
                style={{
                    fontSize: '15px',
                    color: 'black',
                    fontWeight: '500',
                }}
            >
                {label}
            </span>

            <div
                style={{
                    border,
                    borderRadius: '10px',
                    width: '100%',
                }}
            >

                <CheckboxGroup
                    value={value}
                    orientation={direction}
                    onChange={handleChange}
                    isDisabled={disabled}
                    isReadOnly={readyOnly}
                    style={{ backgroundColor: 'white', padding: '5px', width: '100%' }}
                    classNames={
                        customStyle
                            ? {
                                base: "gap-20",
                            }
                            : undefined
                    }
                >
                    <div style={{ display: 'flex', width: '100%', justifyContent, alignItems}}>
                        {items.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    flexDirection: itemLabelPosition === 'above' ? 'column' : 'row',
                                    alignItems: 'center',
                                }}
                            >
                                {itemLabelPosition === 'above' && (
                                    <div style={{ marginLeft: itemLabelMarginLeft }}>
                                        {item.label || item.value}
                                    </div>
                                )}
                                <Checkbox
                                    value={item.value}
                                    size="sm"
                                    classNames={
                                        customStyle
                                            ? {
                                                base: "bg-white",
                                                wrapper: "!border-black !bg-white group-data-[selected=true]:!border-blue-500",
                                                icon: "text-red-600 font-bold",
                                                label: "text-black",
                                            }
                                            : undefined
                                    }
                                >
                                    {itemLabelPosition === 'side' && (item.label || item.value)}
                                </Checkbox>
                            </div>
                        ))}
                    </div>

                </CheckboxGroup>
            </div>
        </div>
    )
}
