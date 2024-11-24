import { createContext, useContext } from "react"
import { PopUpConfigType } from "./popup.context"

interface PopUpContextType {
    showPopUp: (config: PopUpConfigType) => void
}

export const PopUpContextGlobal = createContext<PopUpContextType | undefined>(undefined)

export function usePopUpGlobal() {
    const context = useContext(PopUpContextGlobal)
    if (!context) {
        throw new Error('usePopUp must be used within a PopUpGlobalProvider')
    }
    return context
}