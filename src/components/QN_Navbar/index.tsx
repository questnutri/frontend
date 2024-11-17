'use client'
import QN_Button from '@/components/QN_Button'
import { logout } from '@/lib/logout'
import { useRouter } from 'next/navigation'

export default function QN_Navbar({ children }: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter()
    const handleLogout = async () => {
        const response = await logout('nutritionist')
        if (response.status === 204) {
            document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
            router.push('/home')
        }
    }
    return (
        <div style={{
            width: '250px',
            backgroundColor: '#D9D9D9',
            color: 'black',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            padding: '30px 0px',
            gap: '20px'
        }}>
            <div style={{
                width: '100%',
                textAlign: 'center',
                minHeight: '10%',
                fontSize: '35px'
            }}>
                <h1>{'Olá, {nutri}!'}</h1>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                gap: '10px'
            }}
            >
                {children}
            </div>
            <div style={{
                height: '10%',
                marginTop: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px'
            }}>
                <img src="/logo/logo_vector.png"
                    style={{
                        width: '100%',
                        padding: '30px',
                        height: 'auto'
                    }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <button
                    style={{
                        fontSize: '14px',
                        color: 'white',
                        background: 'red',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        width: '30%'
                    }}
                    onClick={handleLogout}
                >
                    {'Sair'}
                </button>
            </div>
        </div>
    )
}