import { createContext, useContext } from "react"

type ModalContextType = {
    closeModal: () => void
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function useModal() {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider')
    }
    return context
}

