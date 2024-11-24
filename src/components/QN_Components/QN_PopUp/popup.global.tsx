'use client'
import { useState } from "react"
import { PopUpContextGlobal } from "./popup.global.context"
import { QN_PopUp } from "."
import { PopUpConfigType } from "./popup.context"

export default function QN_PopUpGlobalProvider({children}: {children: React.ReactNode}) {
    const [isOpen, setOpen] = useState(false)
    const [config, setConfig] = useState<PopUpConfigType | null>(null)

    const showPopUp = (newConfig: PopUpConfigType) => {
        setConfig(newConfig)
        setOpen(true)
    }

    return (
        <PopUpContextGlobal.Provider value={{ showPopUp }}>
            {children}
            {config && <QN_PopUp isPopUpOpen={isOpen} setPopUpOpen={setOpen} config={config} />}
        </PopUpContextGlobal.Provider>
    )
}
