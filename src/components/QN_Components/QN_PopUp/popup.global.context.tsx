import { createContext, useContext } from "react"
import { PopUpConfigType } from "./popup.context"
import { QN_PopUp_StyleContextType } from "./popup.style.context"

interface PopUpContextType {
    showPopUp: (styleConfig?: QN_PopUp_StyleContextType) => void
}

export const PopUpContextGlobal = createContext<PopUpContextType | undefined>(undefined)

export function usePopUpGlobal() {
    const context = useContext(PopUpContextGlobal)
    if (!context) {
        throw new Error('usePopUp must be used within a PopUpGlobalProvider')
    }
    return context
}