'use client'
import QN_Button from '@/components/QN_Button'
import QN_Input from '@/components/QN_Input'
import { login } from '@/lib/login'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

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

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail({
            ...email,
            value: e.target.value,
            invalid: false,
            invalidMessage: ''
        })
    }

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

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
            }}
        >
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

        </div >
    )
}
