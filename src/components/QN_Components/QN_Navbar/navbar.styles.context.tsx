import { createContext, useContext } from "react"

export type QN_NavbarComponent_StyleContextType = {
    textColor?: string
    backgroundColor?: string
    fontWeight?: string
    selectedItem?: {
        textColor?: string
        iconColor?: string
        backgroudColor?: string
        fontWeight?: string
        fontSize?: string
    }
    hoverItem?: {
        textColor?: string
        iconColor?: string
        backgroudColor?: string
    }
}

export const QN_NavbarComponent_StyleContext = createContext<QN_NavbarComponent_StyleContextType | undefined>(undefined)

export function useNavbarStyle() {
    const context = useContext(QN_NavbarComponent_StyleContext)
    if (!context) throw new Error('useNavbarStyle must be within a QN_NavbarComponent_StyleContext.Provider')
    return context
}

export default function QN_NavbarComponent_StyleProvider({config, children}: {config: any, children: React.ReactNode}) {
    return (
        <QN_NavbarComponent_StyleContext.Provider value={{...config}}>
            {children}
        </QN_NavbarComponent_StyleContext.Provider>
    )
}