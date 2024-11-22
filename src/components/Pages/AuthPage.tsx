'use client'
import QN_Button from '@/components/QN_Button'
import QN_Input from '@/components/QN_Input'
import { fetchData } from '@/lib/fetchData'
import { login } from '@/lib/login'
import { Tabs, Tab } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useRef, useState, useEffect } from 'react'
import QN_Tabs from '../QN_Tabs'
import QN_FormLogin from '../QN_FormLogin'
import QN_FormRegister from '../QN_FormRegister'

interface AuthPageProps {
    loginPath: 'nutritionist' | 'patient' | 'admin'
}

export default function AuthPage({ loginPath }: AuthPageProps) {
    // const router = useRouter()
    // const [isLoading, setLoading] = useState(false)

    // const [email, setEmail] = useState({
    //     value: '',
    //     invalid: false,
    //     invalidMessage: '',
    // })

    // const [password, setPassword] = useState({
    //     value: '',
    //     invalid: false,
    //     invalidMessage: ''
    // })

    const [tabs, setTabs] = useState<string[]>([])
    const [selectedTabIndex, setSelectedTabIndex] = useState<string>('0')

    // const [completeName, setCompleteName] = useState('')
    // const [cellphone, setCellphone] = useState('')
    // const [registerEmail, setRegisterEmail] = useState('')

    useEffect(() => {
        if (loginPath === 'nutritionist') {
            setTabs(['Login', 'Cadastro'])
        } else {
            setTabs(['Login'])
        }
        // setEmail({
        //     ...email,
        //     invalid: false,
        //     invalidMessage: ''
        // })
        // setPassword({
        //     ...password,
        //     invalid: false,
        //     invalidMessage: ''
        // })

    }, [loginPath]);

    // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setEmail({
    //         ...email,
    //         value: e.target.value,
    //         invalid: false,
    //         invalidMessage: ''
    //     })
    // }

    // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setPassword({
    //         ...password,
    //         value: e.target.value,
    //         invalid: false,
    //         invalidMessage: ''
    //     })
    // }

    // const handleLogin = async () => {
    //     let hasError
    //     if (!email.value.trim()) {
    //         setEmail((prev) => ({
    //             ...prev,
    //             invalid: true,
    //             invalidMessage: 'O e-mail é obrigatório',
    //         }))
    //         hasError = true
    //     }

    //     if (!password.value.trim()) {
    //         setPassword((prev) => ({
    //             ...prev,
    //             invalid: true,
    //             invalidMessage: 'A senha é obrigatória',
    //         }))
    //         hasError = true
    //     }

    //     if (hasError) return
    //     setLoading(true)
    //     try {
    //         const response = await login(loginPath, {
    //             email: email.value,
    //             password: password.value
    //         })
    //         switch (response.status) {
    //             case 200:
    //                 if (response.token) {
    //                     document.cookie = `authToken=${response.token}; path=/`
    //                     await fetchData(loginPath)
    //                     router.push('/home')
    //                 }
    //                 break
    //             case 204:
    //                 setPassword({
    //                     ...password,
    //                     invalid: true,
    //                     invalidMessage: 'Senha ainda não definida'
    //                 })
    //                 break
    //             case 404:
    //                 setEmail({
    //                     ...email,
    //                     invalid: true,
    //                     invalidMessage: 'E-mail não encontrado'
    //                 })
    //                 break
    //             case 401:
    //                 setPassword({
    //                     ...password,
    //                     invalid: true,
    //                     invalidMessage: 'Senha incorreta'
    //                 })
    //                 break
    //         }
    //     } catch (error) {

    //     } finally {
    //         setLoading(false)
    //     }


    // }

    const currentForm = (loginPath: string, tab: string): JSX.Element => {
        if (tab === '0') {
            return <QN_FormLogin loginPath={loginPath as 'nutritionist' | 'patient'} />
        } else {
            return <QN_FormRegister />
        }

    }

    return (
        <>
            <div style={{ width: '100%', backgroundColor: loginPath === 'nutritionist' ? '#55B7FE' : "#676767", borderRadius: '50%' }}>
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
                    // marginBottom: '20%',

                }}
            >
                {currentForm(loginPath, selectedTabIndex)}

            </div >

        </>
    )
}
