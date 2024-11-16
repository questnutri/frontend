'use client'
import QN_Button from '@/components/QN_Button'
import QN_Input from '@/components/QN_Input'
import { login } from '@/lib/login'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
            console.error('Erro no login', error)
        }
    }

    return (
        <div
            style={{
                backgroundImage: 'url(/images/nutri-background.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                margin: 0
            }}
        >
            <QN_Input
                label='E-mail'
                type='email'
                onChange={handleEmailChange}
                value={email.value}
                invalid={email.invalid}
                invalidMessage={email.invalidMessage}
                required
                clearable
            />
            <QN_Input
                label='Senha'
                type='password'
                onChange={handlePasswordChange}
                value={password.value}
                invalid={password.invalid}
                invalidMessage={password.invalidMessage}
                required
            />
            <QN_Button type='button' onClick={handleLogin}>Login</QN_Button>

        </div >
    )
}
