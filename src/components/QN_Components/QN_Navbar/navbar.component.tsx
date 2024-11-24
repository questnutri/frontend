'use client'
import { useContext, useEffect } from "react"
import { NavbarItemType, NavbarItemContext } from "./navbar.context"
import NavbarItem from "../QN_NavbarItem"

interface QN_NavbarProps {
    padding?: {
        left?: number
        right?: number
        bottom?: number
        top?: number
    }
    header?: React.ReactNode
    footer?: React.ReactNode
    items?: NavbarItemType[]
}

export default function QN_NavbarComponent({ header, footer, items }: QN_NavbarProps) {
    const navbarContext = useContext(NavbarItemContext)
    const navbarItems = navbarContext?.navbarItems
    useEffect(() => {
        navbarContext?.setNavbarItems(items as NavbarItemType[])
    }, [navbarContext, items])

    return (
        <div style={{
            width: '250px',
            maxWidth: '250px',
            minWidth: '250px',
            backgroundColor: '#D9D9D9',
            color: 'black',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            padding: '30px 0px',
            gap: '20px',
        }}>
            {header && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '10%',
                    fontSize: '15px',
                    gap: '10px'
                }}>
                    {header}
                </div>
            )}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                gap: '10px'
            }}
            >
                {navbarItems?.map((item, index) => (
                    <NavbarItem key={index} name={item.name} icon={item.icon} onClick={() => {
                        navbarContext?.toggleSelection(index)
                        if(item.onClick) item.onClick()
                    }} isSelected={item.isSelected}/>
                ))}
            </div>
            {footer && (
                <div style={{
                    height: '10%',
                    marginTop: 'auto',
                    marginBottom: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px'
                }}>
                    {footer}
                </div>
            )}
        </div>
    )
}
