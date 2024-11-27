'use client'

import React from "react"
import { useNavbarStyle } from "../QN_Navbar/navbar.styles.context"

export interface QN_NavbarItemProps {
    name: string
    icon?: React.ReactNode
    isSelected?: boolean
    onClick?: () => void
}

export default function NavbarItem({ name, icon, isSelected = false, onClick }: QN_NavbarItemProps) {
    const { textColor, fontWeight, selectedItem, hoverItem } = useNavbarStyle()

    const clonedIcon = icon && React.isValidElement(icon)
        ? React.cloneElement(icon as React.ReactElement<{ size: string, color: string }>, {
            color: selectedItem?.iconColor
                ? isSelected
                    ? selectedItem?.iconColor
                    : icon.props.color
                : '#55B7FE',
        })
        : null

    return (
        <div
            className={`w-full h-fit p-[5px_20px] flex justify-start items-center gap-[15px] transition-transform transition-colors duration-500`}
            style={{
                backgroundColor: isSelected
                    ? selectedItem?.backgroundColor
                    : '',
                cursor: 'pointer',
                boxShadow: isSelected ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '',
            }}
            onClick={onClick}
            onMouseEnter={(e) => {
                if (!isSelected) {
                    const element = e.currentTarget
                    if (hoverItem?.backgroundColor) {
                        element.style.backgroundColor = hoverItem.backgroundColor
                    }
                    if (hoverItem?.iconColor && clonedIcon?.props) {
                        const icon = element.querySelector('svg') as SVGElement
                        if (icon) {
                            icon.style.color = hoverItem.iconColor
                        }
                    }
                    if (hoverItem?.textColor) {
                        const text = element.querySelector('p') as HTMLElement
                        if (text) {
                            text.style.color = hoverItem.textColor
                        }
                    }
                }
            }}
            onMouseLeave={(e) => {
                if (!isSelected) {
                    const element = e.currentTarget
                    element.style.backgroundColor = ''
                    if (clonedIcon?.props) {
                        const icon = element.querySelector('svg') as SVGElement
                        if (icon) {
                            icon.style.color = clonedIcon.props.color
                        }
                    }
                    const text = element.querySelector('p') as HTMLElement
                    if (text) {
                        text.style.color = textColor || ''
                    }
                } else {
                    const element = e.currentTarget
                    element.style.backgroundColor = selectedItem?.backgroundColor || ''
                    const icon = element.querySelector('svg') as SVGElement
                    if (icon) {
                        icon.style.color = selectedItem?.iconColor || ''
                    }
                    const text = element.querySelector('p') as HTMLElement
                    if (text) {
                        text.style.color = selectedItem?.textColor || ''
                    }
                }
            }}
        >
            <div>
                {clonedIcon}
            </div>
            <div>
                <p
                    className="text-[15px]"
                    style={{
                        color: isSelected
                            ? selectedItem?.textColor
                            : textColor,
                        fontWeight: isSelected
                            ? selectedItem?.fontWeight
                            : fontWeight,
                    }}
                >
                    {name}
                </p>
            </div>
        </div>
    )
}
