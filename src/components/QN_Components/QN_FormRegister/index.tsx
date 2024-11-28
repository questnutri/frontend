import { useState } from "react";
import QN_Button from "../QN_Button";
import QN_Input from "../QN_Input";

export default function QN_FormRegister() {

    const [newRegister, setNewRegister] = useState({
        completeName: '',
        cellphone: '',
        registerEmail: '',
        crn: '',
        dateOfIssue: `${new Date().toDateString}`
    })

    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                height: '90%'
            }}>
            <QN_Input
                version={1}
                label='Nome completo'
                type='text'
                required={true}
                value={newRegister.completeName}
                onChange={((e) => setNewRegister({ ...newRegister, completeName: e.target.value }))}
                clearable

            />
            <QN_Input
                version={1}
                label='Telefone/Celular'
                type='text'
                required={true}
                value={newRegister.cellphone}
                onChange={((e) => setNewRegister({ ...newRegister, cellphone: e.target.value }))}
                clearable
            />
            <QN_Input
                version={1}
                label='E-mail'
                type='text'
                required={true}
                value={newRegister.registerEmail}
                onChange={((e) => setNewRegister({ ...newRegister, registerEmail: e.target.value }))}
                clearable
            />
            <div
                style={{
                    display: 'flex',
                    gap: '10px'
                }}
            >
                <QN_Input
                    version={1}
                    label='CRN'
                    type='text'
                    value={newRegister.crn}
                    onChange={((e) => setNewRegister({ ...newRegister, crn: e.target.value }))}
                />
                <QN_Input
                    version={1}
                    label='Data de emissão'
                    type='date'
                    required={true}
                    value={`${newRegister.dateOfIssue}`}
                    onChange={((e) => setNewRegister({ ...newRegister, dateOfIssue: e.target.value }))}
                    clearable={false}
                />
            </div>
            <QN_Button
                type='button'
                colorStyle='white'
                width='60%'
            // onClick={}
            >
                Cadastrar
            </QN_Button>
        </div>
    )
}