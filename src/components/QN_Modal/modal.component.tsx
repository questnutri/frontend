import { ReactNode, useEffect, useState } from "react"
import { useModal } from "./modal.context"


interface QN_ModalComponentProps {
    width: string
    height: string
    children: ReactNode
}

export default function QN_ModalComponent({ width, height, children }: QN_ModalComponentProps) {
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
                    width,
                    height,
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