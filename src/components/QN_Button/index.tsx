import { Button } from '@nextui-org/react'

export interface QN_ButtonProps {
    ref?: React.Ref<HTMLButtonElement>
    type?: 'button' | 'submit' | 'reset'
    colorStyle?: 'blue' | 'white' | 'red'
    blocked?: boolean
    children?: React.ReactNode
    onClick?: () => void
    onTab?: () => void
    onEnter?: () => void
}

export default function QN_Button({ ref, type = 'button', colorStyle='blue', children, onClick, onTab, onEnter}: QN_ButtonProps) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Tab' && onTab) {
            e.preventDefault()
            onTab()
        } else if (e.key === 'Enter' && onEnter) {
            e.preventDefault()
            onEnter()
        }
    }

    return (
        <Button 
            ref={ref}
            color="primary" 
            type={type} 
            onClick={onClick} 
            onKeyDown={handleKeyDown}
        >
            {children}
        </Button>
    )
}
