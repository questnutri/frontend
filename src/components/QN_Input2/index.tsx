import { Input } from "@nextui-org/input";

interface QN_Input2Props {
    label: string,
    width?: string,
    type?: string
}

export default function QN_Input2({ label, width = '100%', type = 'text' }: QN_Input2Props) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: `${width}`, gap: '3px' }}>
            <span style={{ fontSize: '15px', marginLeft: '5px', color: 'black', fontWeight: '500' }}>{label}</span>
            <Input
                type={type}
                variant="bordered"
                radius="sm"
                className={'h-2'}
                placeholder={label}
            />
        </div>

    )
}