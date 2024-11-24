import { createContext, ReactNode, useContext } from "react"

interface PopUpContextType {
    closePopUp: () => void
    popUpConfig: PopUpConfigType
    setPopUpConfig: React.Dispatch<React.SetStateAction<PopUpConfigType>>
}

export const PopUpContext = createContext<PopUpContextType | undefined>(undefined)

export function usePopUp() {
    const context = useContext(PopUpContext)
    if (!context) {
        throw new Error('usePopUp must be used within a PopUpProvider')
    }
    return context
}

export interface CustomButtonType {
    text: string
    onClick?: () => void
    colorStyle?: 'blue' | 'white' | 'red'
    keepModalAfterAction?: boolean
    confirmationTextRequired?: string
}

export interface PopUpConfigType {
    message?: string | null
    width?: string
    height?: string
    closeButton?: boolean
    okButton?: boolean
    customButtons?: CustomButtonType[]
    userInput?: string
    autoCloseAfterSeconds?: number
    padding?: string
    textAlign?: 'left' | 'center' | 'right'
    buttonAlign?: 'left' | 'center' | 'right'
    gapBetweenTextAndButtons?: string
    title?: string
    titleColor?: string
    titleTextAlign?: 'left' | 'center' | 'right'
    blockOutsideClose?: boolean
}