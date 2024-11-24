import { useState } from "react";
import QN_Button from "../QN_Button";
import QN_Input from "../QN_Input";

export default function QN_FormRegister() {
    const [completeName, setCompleteName] = useState('')
    const [cellphone, setCellphone] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', height: '80%' }}>
            <QN_Input
                version={1}
                label='Nome completo'
                type='text'
                required={true}
                value={completeName}
                onChange={((e) => setCompleteName(e.target.value))}
                clearable
            />
            <QN_Input
                version={1}
                label='Telefone/Celular'
                type='text'
                required={true}
                value={cellphone}
                onChange={((e) => setCellphone(e.target.value))}
                clearable
            />
            <QN_Input
                version={1}
                label='E-mail'
                type='text'
                required={true}
                value={registerEmail}
                onChange={((e) => setRegisterEmail(e.target.value))}
                clearable
            />
            <QN_Button type='button' colorStyle='white' width='60%'>Cadastrar</QN_Button>
        </div>
    )
}