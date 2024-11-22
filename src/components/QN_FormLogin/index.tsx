'use client'
import { useEffect, useRef, useState } from "react"
import QN_Button from "../QN_Button"
import QN_Input from "../QN_Input"
import { fetchData } from "@/lib/fetchData"
import { login } from "@/lib/login"
import { useRouter } from 'next/navigation'


interface QN_FormLoginProps {
    loginPath: 'nutritionist' | 'patient',
    setForgotPassword: React.Dispatch<React.SetStateAction<boolean>>
}

export default function QN_FormLogin({ loginPath, setForgotPassword }: QN_FormLoginProps) {
    const router = useRouter()
    const [isHovered, setIsHovered] = useState(false)
    const [isLoading, setLoading] = useState(false)

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

    useEffect(() => {
        setEmail({
            ...email,
            invalid: false,
            invalidMessage: ''
        })
        setPassword({
            ...password,
            invalid: false,
            invalidMessage: ''
        })
    }, [loginPath])

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
        setLoading(true)
        try {
            const response = await login(loginPath, {
                email: email.value,
                password: password.value
            })
            switch (response.status) {
                case 200:
                    if (response.token) {
                        document.cookie = `authToken=${response.token}; path=/`
                        await fetchData(loginPath)
                        router.push('/home')
                    }
                    break
                case 204:
                    setPassword({
                        ...password,
                        invalid: true,
                        invalidMessage: 'Senha ainda não definida'
                    })
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

        } finally {
            setLoading(false)
        }


    }

    const emailInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)
    const loginBtnRef = useRef<HTMLButtonElement>(null)

    return (
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
                onEnter={() => passwordInputRef.current?.focus()}
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
                <span
                    onClick={() => setForgotPassword(true)}
                    style={{
                        fontSize: '17px',
                        fontWeight: '600',
                        color: 'white',
                        cursor: 'pointer',
                        textDecoration: isHovered ? 'underline' : 'none',
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Esqueci minha senha
                </span>
            </div>
            <QN_Button
                type='button'
                onClick={handleLogin}
                onTab={() => emailInputRef.current?.focus()}
                onEnter={handleLogin}
                ref={loginBtnRef}
                colorStyle='white'
                width='60%'
                isLoading={isLoading}
            >
                Login
            </QN_Button>
        </>
    )
}