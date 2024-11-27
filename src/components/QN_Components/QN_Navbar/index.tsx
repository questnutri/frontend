'use client'
import QN_NavbarComponent from "./navbar.component"
import { NavbarItemContext, NavbarItemType } from "./navbar.context"
import { useState } from "react"
import QN_NavbarComponent_StyleProvider, { QN_NavbarComponent_StyleContextType } from "./navbar.styles.context"

interface QN_NavbarProps {
    items?: NavbarItemType[]
    header?: React.ReactNode
    footer?: React.ReactNode
    setFirstSelected?: number
    styleConfig?: QN_NavbarComponent_StyleContextType
}

export default function QN_Navbar({
    items,
    header,
    footer,
    setFirstSelected,
    styleConfig,
}: QN_NavbarProps) {
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

    styleConfig = {
        backgroundColor: '#D9D9D9',
        textColor: '',
        selectedItem: {
            textColor: 'white',
            iconColor: 'white',
            backgroundColor: '#676767',
        },
        hoverItem: {
            textColor: 'white',
            iconColor: 'white',
            backgroundColor: '#55B7FE'
        },
        ...styleConfig,
    }

    return (
        <NavbarItemContext.Provider value={{ navbarItems, setNavbarItems, toggleSelection }}>
            <QN_NavbarComponent_StyleProvider config={{...styleConfig}}>
                <QN_NavbarComponent
                    header={header}
                    items={navbarItems}
                    footer={footer}
                />
            </QN_NavbarComponent_StyleProvider>
        </NavbarItemContext.Provider>
    )
}