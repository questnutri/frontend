import { RadioGroup, Radio } from "@nextui-org/react"

interface QN_RadioGroupProps {
    label: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    items: string[],
    direction?: 'horizontal' | 'vertical',
    disable?: boolean,
    readyOnly?: boolean,
}

export default function QN_RadioGroup({ label, value, setValue, items, direction = 'vertical', disable, readyOnly }: QN_RadioGroupProps) {

    const handleChange = (selectedValue: string | number | undefined) => {
        if (typeof selectedValue === "string") {
            setValue(selectedValue)
        }
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
                <RadioGroup
                    value={value}
                    onValueChange={handleChange}
                    orientation={direction}
                    isDisabled={disable}
                    isReadOnly={readyOnly}
                >
                    {items.map((item, index) => (
                        <Radio value={item} key={index}>{item}</Radio>
                    ))}
                </RadioGroup>
            </div>
        </div>

    );
}