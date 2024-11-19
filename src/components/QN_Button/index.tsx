import { Button } from '@nextui-org/react'

export interface QN_ButtonProps {
    ref?: React.Ref<HTMLButtonElement>
    type?: 'button' | 'submit' | 'reset'
    colorStyle?: 'blue' | 'white' | 'red'
    width?: string
    blocked?: boolean
    isLoading?: boolean
    children?: React.ReactNode
    onClick?: () => void
    onTab?: () => void
    onEnter?: () => void
}

export default function QN_Button({ ref, type = 'button', colorStyle = 'blue', width = '70%', blocked, isLoading, children, onClick, onTab, onEnter }: QN_ButtonProps) {
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
            type={type}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            isLoading={isLoading}
            style={{
                backgroundColor: colorStyle === 'blue' ? '#23a3ff' : colorStyle === 'red' ? '#FF0000' : 'white',
                color: colorStyle === 'white' ? '#23a3ff' : 'white',
                boxShadow: '0 3px 4px rgba(0, 0, 0, 0.4)',
                fontWeight: '600',
                width: `${width}`
            }}
            isDisabled={blocked}
        >
            {children}
        </Button>
    )
}
