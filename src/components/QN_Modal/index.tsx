'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { ReactNode, useEffect, useState } from 'react'

interface QN_ModalProps {
    content: any
    contentClose: () => void
}

export default function QN_Modal({ content, contentClose }: QN_ModalProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    useEffect(() => {
        if (content) {
            onOpen()
        }
    }, [content])

    useEffect(() => {
        if (!isOpen) {
            contentClose()
        }
    }, [onOpenChange])

    if (!content) return null

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            {/* <ModalHeader className="flex flex-col gap-1"></ModalHeader> */}
                            <ModalBody>
                                {content}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

import React, { createContext, useContext } from 'react'

type ModalContextType = {
    closeModal: () => void
    openModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

function useModal() {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider')
    }
    return context
}

function ModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            <>
                {isOpen && (
                    <QN_ModalComponent>
                        {children}
                    </QN_ModalComponent>
                )}
            </>
        </ModalContext.Provider>
    )
}

export function QN_Modal2({
    isOpen,
    setOpen,
    children
}: {
    isOpen: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    children: ReactNode
}) {
    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            <>
                {isOpen && (
                    <QN_ModalComponent>
                        {children}
                    </QN_ModalComponent>
                )}
            </>
        </ModalContext.Provider>
    )
}

function QN_ModalComponent({ children }: { children: ReactNode }) {
    const { closeModal } = useModal()
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsAnimating(true)
        }, 0)
    }, [])

    return (
        <div
            onClick={closeModal}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: 'white',
                    width: '85%',
                    height: '90%',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    transform: isAnimating ? 'scale(1) translateZ(0)' : 'scale(1.05) translateZ(150px)',
                    opacity: isAnimating ? 1 : 0,
                    transition: 'transform 0.2s ease-out, opacity 0.1s ease-out',
                    overflow: 'hidden',
                }}
            >
                {children}
            </div>
        </div>
    )
}