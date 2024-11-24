import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import QN_PopUpComponent from './popup.component'
import { PopUpConfigType, PopUpContext } from './popup.context'

interface PopUpProps {
    isPopUpOpen: boolean
    setPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>
    config?: PopUpConfigType
}

export function QN_PopUp({ config, isPopUpOpen, setPopUpOpen}: PopUpProps) {
    const closePopUp = () => setPopUpOpen(false)

    const [popUpConfig, setPopUpConfig] = useState<PopUpConfigType>({
        message: null,
        closeButton: false,
        okButton: false,
        customButtons: [],
        width: 'auto',
        height: 'auto',
        userInput: '',
        padding: '8px',
        textAlign: 'center',
        buttonAlign: 'center',
        title: '',
        titleColor: '#000000',
        titleTextAlign: 'center',
        blockOutsideClose: false,
    })

    useEffect(() => {
        const showPopUp = () => {
            if (isPopUpOpen) {
                setPopUpConfig({
                    message: config?.message || null,
                    closeButton: config?.closeButton || false,
                    okButton: config?.okButton || false,
                    customButtons: config?.customButtons || [],
                    width: config?.width || 'auto',
                    height: config?.height || 'auto',
                    userInput: '',
                    padding: config?.padding || '8px',
                    textAlign: config?.textAlign || 'center',
                    buttonAlign: config?.buttonAlign || 'center',
                    gapBetweenTextAndButtons: config?.gapBetweenTextAndButtons || '0px',
                    title: config?.title || '',
                    titleColor: config?.titleColor || '#000000',
                    titleTextAlign: config?.titleTextAlign || 'center',
                    blockOutsideClose: config?.blockOutsideClose || false,
                })
                setPopUpOpen(true)

                if (config?.autoCloseAfterSeconds) {
                    setTimeout(() => {
                        setPopUpOpen(false)
                    }, config.autoCloseAfterSeconds * 1000)
                }
            }
        }

        showPopUp()
    }, [isPopUpOpen, config])

    return (
        <PopUpContext.Provider value={{ closePopUp, popUpConfig, setPopUpConfig }}>
            <QN_PopUpComponent isOpen={isPopUpOpen} setOpen={setPopUpOpen} />
        </PopUpContext.Provider>
    )
}
