import { createContext, useContext } from "react"

interface FormContextType {
    form: any
    setForm: (update: any) => void
}

export const FormContext = createContext<FormContextType | undefined>(undefined)

export function useForm() {
    const context = useContext(FormContext)
    if(!context) {
        throw new Error('useForm must be within a FormContextProvider')
    }
    return context
}