import { Button } from '@nextui-org/react'

export interface QN_ButtonProps {
    type?: 'button' | 'submit' | 'reset'
    children?: React.ReactNode
    onClick?: () => void 
}

export default function QN_Button({ type = 'button', children, onClick }: QN_ButtonProps) {
    return (
        <Button color="primary" type={type} onClick={onClick}>
            {children}
        </Button>
    )
}
