'use client'
import React, { ReactNode } from 'react'
import QN_ModalComponent from './modal.component'
import { ModalContext } from './modal.context'

interface QN_ModalProps {
    width?: string
    height?: string
    isOpen: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    blockOutsideClose?: boolean
    children: ReactNode
}

export default function QN_Modal({width='85%', height='90%', isOpen, setOpen, blockOutsideClose=false, children}: QN_ModalProps) {
    const closeModal = () => setOpen(false)

    return (
        <ModalContext.Provider value={{ closeModal }}>
            <>
                {isOpen && (
                    <QN_ModalComponent width={width} height={height} blockOutsideClose={blockOutsideClose}>
                        {children}
                    </QN_ModalComponent>
                )}
            </>
        </ModalContext.Provider>
    )
}