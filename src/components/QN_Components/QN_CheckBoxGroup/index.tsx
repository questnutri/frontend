import { CheckboxGroup, Checkbox } from "@nextui-org/react"

interface QN_CheckBoxGroupProps {
    label: string
    items: string[]
    values?: string[]
    direction?: 'horizontal' | 'vertical'
    disabled?: boolean
    readyOnly?: boolean
    customStyle?: boolean
    onChange: (selectedValues: string[]) => void
}

export default function QN_CheckBoxGroup({
    label,
    items,
    values,
    direction = 'vertical',
    disabled,
    readyOnly,
    customStyle = false,
    onChange,
}: QN_CheckBoxGroupProps) {

    const handleChange = (selectedValues: string[]) => {
        onChange(selectedValues)
    }

    return (
        <div>
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
            <div
                style={{
                    border: '2px solid lightGray',
                    borderRadius: '10px',
                    padding: '10px',
                    width: 'fit-content',
                }}
            >
                <CheckboxGroup
                    value={values}
                    orientation={direction}
                    onChange={handleChange}
                    isDisabled={disabled}
                    isReadOnly={readyOnly}
                    style={{ backgroundColor: 'white', width: 'fit-content', padding: '5px' }}
                    classNames={
                        customStyle
                            ? {
                                base: "gap-3",
                            }
                            : undefined
                    }
                >
                    {items.map((item, index) => (
                        <Checkbox
                            value={item}
                            key={index}
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
                            {item}
                        </Checkbox>
                    ))}
                </CheckboxGroup>
            </div>
        </div>
    )
}
