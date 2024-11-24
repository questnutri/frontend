import { Button } from '@nextui-org/react'

export interface QN_ButtonProps {
    ref?: React.Ref<HTMLButtonElement>
    type?: 'button' | 'submit' | 'reset'
    colorStyle?: 'blue' | 'white' | 'red'
    width?: string
    height?: string
    blocked?: boolean
    isLoading?: boolean
    borderRadius?: string
    fontSize?: string
    children?: React.ReactNode
    onClick?: () => void
    onTab?: () => void
    onEnter?: () => void
}

export default function QN_Button({
    ref,
    type = 'button',
    colorStyle = 'blue',
    width = '70%',
    height,
    blocked,
    isLoading,
    borderRadius,
    fontSize,
    children,
    onClick,
    onTab,
    onEnter
}: QN_ButtonProps) {
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
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: `100%`,
                justifyContent: 'space-around'
            }}
        >
            {/* <span
                style={{
                    fontSize: "15px",
                    marginLeft: "8px",
                    color: "black",
                    fontWeight: "500",
                }}
            >
                { }
            </span> */}
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
                    fontSize,
                    width: `${width}`,
                    height,
                    borderRadius
                }}
                isDisabled={blocked}
            >
                {children}
            </Button>
        </div>
    )
}
