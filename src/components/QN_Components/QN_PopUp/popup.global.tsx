'use client'
import { useState } from "react"
import { PopUpContextGlobal } from "./popup.global.context"
import { QN_PopUp } from "."
import { PopUpConfigType } from "./popup.context"
import { QN_PopUp_StyleContextType } from "./popup.style.context"

export default function QN_PopUpGlobalProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setOpen] = useState(false)
    const [config, setConfig] = useState<PopUpConfigType | null>(null)

    const [style, setStyle] = useState<QN_PopUp_StyleContextType>({})

    const showPopUp = (styleConfig?: QN_PopUp_StyleContextType) => {
        setStyle({
            customButtons: {
                items: [],
            },
            titleConfig: {
                title: null,
                textColor: '',
                textAlign: 'center',
                fontWeight: '600'
            },
            windowConfig: {
                width: 'auto',
                height: 'auto',
                padding: '8px',
                gapBetweenTextAndButtons: '0px',
                blockOutsideClose: false
            },
            bodyConfig: {
                content: null,
                textAlign: 'center'
            },
            defaultButtons: {
                closeButton: false,
                okButton: false,
                buttonAlign: 'center'
            },
            ...styleConfig,
        })
        setOpen(true)
    }

    return (
        <PopUpContextGlobal.Provider value={{ showPopUp }}>
            {children}
            {<QN_PopUp isPopUpOpen={isOpen} setPopUpOpen={setOpen} styleConfig={style} />}
        </PopUpContextGlobal.Provider>
    )
}
