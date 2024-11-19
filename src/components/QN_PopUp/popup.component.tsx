import QN_Modal from "../QN_Modal"
import QN_Button from "../QN_Button"
import { usePopUp } from "./popup.context"

interface QN_PopUpProps {
    isOpen: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function QN_PopUpComponent({ isOpen, setOpen }: QN_PopUpProps) {
    const {popUpConfig, setPopUpConfig} = usePopUp()

    return (
        <QN_Modal isOpen={isOpen} setOpen={setOpen} width={popUpConfig.width} height={popUpConfig.height}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: popUpConfig.padding, textAlign: popUpConfig.textAlign }}>
                {popUpConfig.title && (
                    <div style={{ fontWeight: 'bold', color: popUpConfig.titleColor, textAlign: popUpConfig.titleTextAlign, marginBottom: '8px' }}>
                        {popUpConfig.title}
                    </div>
                )}
                <div style={{ marginBottom: popUpConfig.gapBetweenTextAndButtons }}>
                    {popUpConfig.message}
                </div>
                {popUpConfig.customButtons?.some(button => button.confirmationTextRequired) && (
                    <div style={{ marginTop: '16px' }}>
                        {popUpConfig.customButtons.map(({ confirmationTextRequired }, index) => (
                            confirmationTextRequired && (
                                <p key={index} style={{ color: '#676767', fontSize: '12px' }}>
                                    {`Para continuar, digite "${confirmationTextRequired}":`}
                                </p>
                            )
                        ))}
                        <input
                            type="text"
                            value={popUpConfig.userInput}
                            onChange={e => setPopUpConfig(prevConfig => ({ ...prevConfig, userInput: e.target.value }))}
                            style={{
                                width: '100%',
                                padding: '8px',
                                fontSize: '14px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                marginBottom: '8px',
                            }}
                        />
                    </div>
                )}
                <div style={{ display: 'flex', justifyContent: popUpConfig.buttonAlign, gap: '8px', marginTop: popUpConfig.gapBetweenTextAndButtons, padding: popUpConfig.padding }}>
                    {popUpConfig.customButtons?.map(({ text, onClick, colorStyle, keepModalAfterAction, confirmationTextRequired }, index) => (
                        <QN_Button
                            key={index}
                            colorStyle={colorStyle || 'blue'}
                            onClick={() => {
                                if (onClick) onClick()
                                    setOpen(keepModalAfterAction || false)
                            }}
                            blocked={!!confirmationTextRequired && popUpConfig.userInput !== confirmationTextRequired}
                        >
                            {text}
                        </QN_Button>
                    ))}
                    {popUpConfig.okButton && (
                        <QN_Button colorStyle="blue" onClick={() => setOpen(false)}>
                            {`Ok`}
                        </QN_Button>
                    )}
                    {popUpConfig.closeButton && (
                        <QN_Button colorStyle="red" onClick={() => setOpen(false)}>
                            {`Fechar`}
                        </QN_Button>
                    )}
                </div>
            </div>
        </QN_Modal>
    )
}