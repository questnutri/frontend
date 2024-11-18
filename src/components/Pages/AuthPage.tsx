'use client'
import QN_Button from '@/components/QN_Button'
import QN_Input from '@/components/QN_Input'
import { login } from '@/lib/login'
import { Tabs, Tab } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

interface AuthPageProps {
    loginPath: string
}

export default function AuthPage({ loginPath }: AuthPageProps) {
    const router = useRouter()

    const [email, setEmail] = useState({
        value: '',
        invalid: false,
        invalidMessage: '',
    })

    const [password, setPassword] = useState({
        value: '',
        invalid: false,
        invalidMessage: ''
    })

    const [tab, setTab] = useState({
        value: 'login',
        role: loginPath
    })

    const [completeName, setCompleteName] = useState('')
    const [cellphone, setCellphone] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')

    useEffect(() => {
        if (loginPath === 'patient') {
            setTab((prevTab) => ({
                ...prevTab,
                value: 'login'
            }))
        }
        setTab((prevTab) => ({
            ...prevTab,
            role: loginPath,
        }));
    }, [loginPath, tab.value]);
    console.log(loginPath, tab);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail({
            ...email,
            value: e.target.value,
            invalid: false,
            invalidMessage: ''
        })
    }

    const handleTabChange = (key: string | number) => {
        const tabIndex = key.toString().replace('$.', '')
        const tabValue = tabIndex === '0' ? 'login' : 'register'
        setTab({
            ...tab,
            value: tabValue
        });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword({
            ...password,
            value: e.target.value,
            invalid: false,
            invalidMessage: ''
        })
    }

    const handleLogin = async () => {
        let hasError
        if (!email.value.trim()) {
            setEmail((prev) => ({
                ...prev,
                invalid: true,
                invalidMessage: 'O e-mail é obrigatório',
            }))
            hasError = true
        }

        if (!password.value.trim()) {
            setPassword((prev) => ({
                ...prev,
                invalid: true,
                invalidMessage: 'A senha é obrigatória',
            }))
            hasError = true
        }

        if (hasError) return

        try {
            const response = await login(loginPath, {
                email: email.value,
                password: password.value
            })
            switch (response.status) {
                case 200:
                    if (response.token) {
                        document.cookie = `authToken=${response.token}; path=/`
                        router.push('/home');
                    }
                    break
                case 404:
                    setEmail({
                        ...email,
                        invalid: true,
                        invalidMessage: 'E-mail não encontrado'
                    })
                    break
                case 401:
                    setPassword({
                        ...password,
                        invalid: true,
                        invalidMessage: 'Senha incorreta'
                    })
                    break
            }
        } catch (error) {
        }
    }

    const emailInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)
    const loginBtnRef = useRef<HTMLButtonElement>(null)
    console.log(completeName);

    return (
        <>
            <div style={{ width: '100%', backgroundColor: '#55B7FE', borderRadius: '50%' }}>
                {loginPath === 'nutritionist' ? (
                    <Tabs
                        className={'w-full'}
                        style={{
                            backgroundColor: '#55B7FE',
                            display: 'flex',
                            borderRadius: '10px',
                            padding: '2px 2px'
                        }}
                        color='primary'
                        onSelectionChange={handleTabChange}
                    >
                        <Tab title='Login' className={'w-56 font-semibold'}></Tab>
                        <Tab title='Cadastro' className={'w-56 font-semibold'} ></Tab>
                    </Tabs>
                ) : (
                    <Tabs
                        className={'w-full bg-cyan-400 text-gray-950'}
                        style={{
                            backgroundColor: '#55B7FE',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: '10px'
                        }}
                        color='primary'
                    >
                        <Tab title='Login' className={'w-full font-semibold'}></Tab>
                    </Tabs>
                )}

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
                    // marginBottom: '20%',

                }}
            >
                {tab.value === 'register' && tab.role === 'nutritionist' ? (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', height: '80%' }}>
                        <QN_Input
                            label='Nome completo'
                            type='text'
                            required={true}
                            value={completeName}
                            onChange={((e) => setCompleteName(e.target.value))}
                            clearable
                        />
                        <QN_Input
                            label='Telefone/Celular'
                            type='text'
                            required={true}
                            value={cellphone}
                            onChange={((e) => setCellphone(e.target.value))}
                            clearable
                        />
                        <QN_Input
                            label='E-mail'
                            type='text'
                            required={true}
                            value={registerEmail}
                            onChange={((e) => setRegisterEmail(e.target.value))}
                            clearable
                        />
                        <QN_Button type='button' colorStyle='white' width='60%'>Cadastrar</QN_Button>
                    </div>
                ) : (
                    <>
                        <QN_Input
                            ref={emailInputRef}
                            label='E-mail'
                            type='email'
                            onChange={handleEmailChange}
                            value={email.value}
                            invalid={email.invalid}
                            invalidMessage={email.invalidMessage}
                            onTab={() => passwordInputRef.current?.focus()}
                            required
                            clearable
                        />
                        <QN_Input
                            ref={passwordInputRef}
                            label='Senha'
                            type='password'
                            onChange={handlePasswordChange}
                            value={password.value}
                            invalid={password.invalid}
                            invalidMessage={password.invalidMessage}
                            onTab={() => loginBtnRef.current?.focus()}
                            onEnter={handleLogin}
                            required
                        />
                        <div>
                            <p>Esqueci minha senha</p>
                        </div>
                        <QN_Button
                            type='button'
                            onClick={handleLogin}
                            onTab={() => emailInputRef.current?.focus()}
                            onEnter={handleLogin}
                            ref={loginBtnRef}
                            colorStyle='white'
                            width='60%'
                        >
                            Login
                        </QN_Button>
                    </>
                )}
            </div >

        </>
    )
}
