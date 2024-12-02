import QN_Modal from "../QN_Modal"
import QN_Button from "../QN_Button"
import { usePopUp } from "./popup.context"
import { usePopUpStyle } from "./popup.style.context"
import { useEffect, useState } from "react"

interface QN_PopUpProps {
    isOpen: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function QN_PopUpComponent({ isOpen, setOpen }: QN_PopUpProps) {
    const [userInput, setUserInput] = useState('')
    const {closePopUp} = usePopUp()
    const { windowConfig, defaultButtons, bodyConfig, titleConfig, customButtons } = usePopUpStyle()

    useEffect(() => {
        setUserInput('')
    }, [closePopUp])

    return (
        <QN_Modal
            isOpen={isOpen}
            setOpen={setOpen}
            width={windowConfig?.width || 'auto'}
            height={windowConfig?.height || 'auto'}
            blockOutsideClose={windowConfig?.blockOutsideClose || false}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                padding: windowConfig?.padding || '20px',
                textAlign: bodyConfig?.textAlign || 'center',
                height: '100%'
            }}>
                {titleConfig && (
                    <div style={{
                        fontWeight: titleConfig?.fontWeight || '600',
                        color: titleConfig?.textColor || '',
                        textAlign: titleConfig?.textAlign as 'left' | 'center' | 'right' || 'center' || 'center',
                        marginBottom: titleConfig?.marginBottom || '8px'
                    }}>
                        {titleConfig.title}
                    </div>
                )}
                {bodyConfig?.content && (
                    <div style={{
                        marginBottom: windowConfig?.gapBetweenTextAndButtons || '20px',
                        height: '100%',
                    }}>
                        {bodyConfig?.content}
                    </div>
                )}

                {customButtons?.items?.some(button => button.confirmationTextRequired) && (
                    <div>
                        {customButtons.items?.map(({ confirmationTextRequired }, index) => (
                            confirmationTextRequired && (
                                <p key={index} style={{ color: '#676767', fontSize: '12px' }}>
                                    {`Para continuar, digite "${confirmationTextRequired}":`}
                                </p>
                            )
                        ))}
                        <input
                            type="text"
                            value={userInput}
                            onChange={e => setUserInput(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px',
                                fontSize: '14px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                marginBottom: '15px',
                            }}
                        />
                    </div>
                )}
                <div style={{
                    display: 'flex',
                    justifyContent: defaultButtons?.buttonAlign || 'space-between',
                    gap: '8px',
                    marginTop: windowConfig?.gapBetweenTextAndButtons || '0px',
                    padding: windowConfig?.padding
                }}>
                    {customButtons?.items?.map(({ text, onClick, colorStyle, keepModalAfterAction, confirmationTextRequired, width }, index) => (
                        <QN_Button
                            key={index}
                            colorStyle={colorStyle || 'blue'}
                            onClick={() => {
                                if (onClick) onClick()
                                setOpen(keepModalAfterAction || false)
                            }}
                            blocked={!!confirmationTextRequired && userInput !== confirmationTextRequired}
                            width={width}
                        >
                            {text}
                        </QN_Button>
                    ))}

                    {defaultButtons?.okButton && (
                        <QN_Button colorStyle="blue" onClick={() => setOpen(false)}>
                            {`Ok`}
                        </QN_Button>
                    )}
                    {defaultButtons?.closeButton && (
                        <QN_Button colorStyle="red" onClick={() => setOpen(false)}>
                            {`Fechar`}
                        </QN_Button>
                    )}
                </div>
            </div>
        </QN_Modal>
    )
}