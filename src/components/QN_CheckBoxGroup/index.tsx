import { CheckboxGroup, Checkbox } from "@nextui-org/react"

interface QN_CheckBoxGroupProps {
    label: string
    items: string[]
    values: string[]
    setValues: React.Dispatch<React.SetStateAction<string[]>>
    direction?: 'horizontal' | 'vertical'
    disabled?: boolean
    readyOnly?: boolean
}

export default function QN_CheckBoxGroup({
    label,
    items,
    values,
    setValues,
    direction = 'vertical',
    disabled,
    readyOnly
}: QN_CheckBoxGroupProps) {

    const handleChange = (selectedValues: string[]) => {
        setValues(selectedValues)
        console.log(values)
    };

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
            <div style={{ border: '2px solid lightGray', borderRadius: '10px', padding: '10px', width: 'fit-content' }}>
                <CheckboxGroup
                    value={values}
                    orientation={direction}
                    onChange={handleChange}
                    isDisabled={disabled}
                    isReadOnly={readyOnly}
                    style={{ backgroundColor: 'white', width: 'fit-content', padding: '5px' }}
                >
                    {items.map((item, index) => (
                        <Checkbox value={item} key={index} size="sm">
                            {item}
                        </Checkbox>
                    ))}
                </CheckboxGroup>
            </div>

        </div>


    )
}
