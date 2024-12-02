import { createContext, useContext } from "react"

export type QN_PopUp_StyleContextType = {
    customButtons?: {
        items?: {
            text: string
            onClick?: () => void
            colorStyle?: 'blue' | 'white' | 'red'
            keepModalAfterAction?: boolean
            confirmationTextRequired?: string
            width?: string
        }[],
    }
    titleConfig?: {
        title?: string | null
        textColor?: string
        textAlign?: string
        fontWeight?: string
        marginBottom?: string
    }
    windowConfig?: {
        width?: string
        height?: string
        padding?: string
        gapBetweenTextAndButtons?: string
        blockOutsideClose?: boolean
        autoCloseAfterSeconds?: number
    }
    bodyConfig?: {
        content?: string | React.ReactNode | null
        textAlign?: 'left' | 'center' | 'right',
        height?: string
    }
    defaultButtons?: {
        closeButton?: boolean
        okButton?: boolean
        buttonAlign?: 'left' | 'center' | 'right'
    }
}

const QN_PopUp_StyleContext = createContext<QN_PopUp_StyleContextType | undefined>(undefined)

export function usePopUpStyle() {
    const context = useContext(QN_PopUp_StyleContext)
    if (!context) throw new Error('usePopUpStyle should be within a QN_PopUp_StyleContext.Provider')
    return context
}

export default function QN_PopUp_StyleContextProvider({ styleConfig, children }: { styleConfig: any, children: React.ReactNode }) {
    return (
        <QN_PopUp_StyleContext.Provider value={{ ...styleConfig }}>
            {children}
        </QN_PopUp_StyleContext.Provider>
    )
}