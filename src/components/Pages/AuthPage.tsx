'use client'
import { useState, useEffect } from 'react'
import QN_Tabs from '../QN_Tabs'
import QN_FormLogin from '../QN_FormLogin'
import QN_FormRegister from '../QN_FormRegister'
import QN_ForgotPassword from '../QN_ForgotPassword'

interface AuthPageProps {
    loginPath: 'nutritionist' | 'patient' | 'admin'
}

export default function AuthPage({ loginPath }: AuthPageProps) {

    const [tabs, setTabs] = useState<string[]>(['Login', 'Cadastro'])
    const [selectedTabIndex, setSelectedTabIndex] = useState<string>('Login')
    const [forgotPassword, setForgotPassword] = useState(false)

    useEffect(() => {
        if (loginPath === 'nutritionist') {
            setTabs(['Login', 'Cadastro'])
        } else {
            setTabs(['Login'])
        }
    }, [loginPath])

    const currentForm = (loginPath: string, tab: string): JSX.Element => {
        if (forgotPassword) {
            return <QN_ForgotPassword role={loginPath} setForgotPassword={setForgotPassword} />
        }
        if (tab === 'Login') {
            return <QN_FormLogin loginPath={loginPath as 'nutritionist' | 'patient'} setForgotPassword={setForgotPassword} />
        } else {
            return <QN_FormRegister />
        }
    }

    return (
        <>
            <div style={{ display: forgotPassword ? 'none' : '', width: '100%', backgroundColor: loginPath === 'nutritionist' ? '#55B7FE' : "#676767", borderRadius: '50%' }}>
                <QN_Tabs tabs={tabs} value={selectedTabIndex} setValue={setSelectedTabIndex} />
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    padding: '0px 30px',
                }}
            >
                {currentForm(loginPath, selectedTabIndex)}
            </div >
        </>
    )
}