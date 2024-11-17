import { useSwitch, VisuallyHidden } from "@nextui-org/react"
import { ReactNode, useEffect, useState, useRef } from "react"

interface QN_SwitchProps {
    onIcon?: ReactNode
    onColor?: string
    offIcon?: ReactNode
    offColor?: string
    width?: string
    onText?: { value: string, color: string }
    offText?: { value: string, color: string }
    onChange?: (isSelected: boolean) => void
    defaultSelected?: boolean
}

export default function QN_Switch({
    onIcon,
    onColor,
    offIcon,
    offColor,
    width = "75px",
    onText,
    offText,
    onChange,
    defaultSelected = false
}: QN_SwitchProps) {
    const [dynamicWidth, setDynamicWidth] = useState(width)
    const [isSelected, setIsSelected] = useState(defaultSelected)
    const onTextRef = useRef<HTMLSpanElement | null>(null)
    const offTextRef = useRef<HTMLSpanElement | null>(null)

    const {
        Component,
        slots,
        getBaseProps,
        getInputProps,
        getWrapperProps
    } = useSwitch({
        isSelected,
        onChange: () => {
            const newSelected = !isSelected
            setIsSelected(newSelected)
            if (onChange) onChange(newSelected)
        }
    })

    const ballTranslateX = isSelected ? `calc(${dynamicWidth} - 2rem)` : "0"

    const onIconSize = isSelected ? '1.25rem' : '1rem'
    const offIconSize = isSelected ? '1rem' : '1.25rem'

    useEffect(() => {
        const onTextWidth = onText && onTextRef.current ? onTextRef.current.offsetWidth : 0
        const offTextWidth = offText && offTextRef.current ? offTextRef.current.offsetWidth : 0

        const maxTextWidth = Math.max(onTextWidth, offTextWidth)

        const onIconWidth = onIconSize === '1.25rem' ? 20 : 16
        const offIconWidth = offIconSize === '1.25rem' ? 20 : 16

        const baseWidth = parseFloat(width)

        const totalWidth = maxTextWidth + onIconWidth + offIconWidth + baseWidth

        setDynamicWidth(`${totalWidth / 16}rem`)
    }, [])

    return (
        <Component {...getBaseProps()} className="relative flex items-center">
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <div
                {...getWrapperProps()}
                className={slots.wrapper({
                    class: [
                        "h-8 flex items-center rounded-full relative",
                        "transition-colors duration-200",
                        isSelected
                            ? (onColor ? `bg-[${onColor}]` : 'bg-QN-blue')
                            : (offColor ? `bg-[${offColor}]` : 'bg-QN-strong-gray')
                    ]
                })}
                style={{ width: dynamicWidth }}
            >
                <span
                    className={`absolute left-2 transition-all duration-200`}
                    style={{ fontSize: onIconSize }}
                >
                    {onIcon}
                </span>
                {onText && isSelected && (
                    <span
                        ref={onTextRef}
                        className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-200`}
                        style={{ fontSize: '15px', fontWeight: 'bold', color: onText.color }}
                    >
                        {onText.value}
                    </span>
                )}
                {offText && !isSelected && (
                    <span
                        ref={offTextRef}
                        className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-200`}
                        style={{ fontSize: '15px', fontWeight: 'bold', color: offText.color }}
                    >
                        {offText.value}
                    </span>
                )}
                <span
                    className={`absolute right-2 transition-all duration-200`}
                    style={{ fontSize: offIconSize }}
                >
                    {offIcon}
                </span>

                <div
                    className={`h-6 w-6 bg-white rounded-full shadow-md transition-transform duration-200`}
                    style={{ transform: `translateX(${ballTranslateX})` }}
                />
            </div>
        </Component>
    )
}
