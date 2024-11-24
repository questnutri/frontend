import { createContext, useContext } from 'react'

export type NavbarItemType = {
    name: string
    icon?: React.ReactNode
    isSelected?: boolean
    onClick?: () => void
}

type NavbarItemContextType = {
    navbarItems: NavbarItemType[]
    setNavbarItems: (items: NavbarItemType[]) => void
    toggleSelection: (index: number) => void
}

export const NavbarItemContext = createContext<NavbarItemContextType | undefined>(undefined)

export const useNavbar = () => {
    const context = useContext(NavbarItemContext)
    if (!context) throw new Error('useNavbar must be used within a NavbarProvider')
    return context
}
