import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import QN_PopUpComponent from './popup.component'
import { PopUpConfigType, PopUpContext } from './popup.context'
import QN_PopUp_StyleContextProvider, { QN_PopUp_StyleContextType } from './popup.style.context'

interface PopUpProps {
    isPopUpOpen: boolean
    setPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>
    styleConfig?: QN_PopUp_StyleContextType
}

export function QN_PopUp({ isPopUpOpen, setPopUpOpen, styleConfig}: PopUpProps) {
    const closePopUp = () => setPopUpOpen(false)

    styleConfig = {
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
    }

    return (
        <PopUpContext.Provider value={{ closePopUp }}>
            <QN_PopUp_StyleContextProvider styleConfig={{...styleConfig}}>
                <QN_PopUpComponent isOpen={isPopUpOpen} setOpen={setPopUpOpen} />
            </QN_PopUp_StyleContextProvider>

        </PopUpContext.Provider>
    )
}
