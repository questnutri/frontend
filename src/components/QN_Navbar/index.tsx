'use client'
import QN_NavbarComponent from "./navbar.component"
import { NavbarItemContext, NavbarItemType } from "./navbar.context"
import { useState } from "react"

interface QN_NavbarProps {
    items?: NavbarItemType[]
    header?: React.ReactNode
    footer?: React.ReactNode
    setFirstSelected?: number
}

export default function QN_Navbar({ items, header, footer, setFirstSelected }: QN_NavbarProps) {
    const [navbarItems, setNavbarItems] = useState<NavbarItemType[]>(() =>
        items?.map((item, index) => ({
            ...item,
            isSelected: index === (setFirstSelected ?? -1)
        })) || []
    )

    const toggleSelection = (index: number) => {
        const updatedItems = [...navbarItems]
        updatedItems.forEach((item, i) => {
            item.isSelected = i === index
        })
        setNavbarItems(updatedItems)
    }

    return (
        <NavbarItemContext.Provider value={{ navbarItems, setNavbarItems, toggleSelection }}>
            <QN_NavbarComponent
                header={header}
                items={navbarItems}
                footer={footer}
            />
        </NavbarItemContext.Provider>
    )
}