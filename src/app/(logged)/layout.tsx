'use client'
import QN_Navbar from "@/components/QN_Navbar";
import NavbarItem from "@/components/QN_NavbarItem";
import { RiHome2Fill, FaUser, FaUsers } from '../../icons/index'
import { Avatar, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IUserData } from "@/lib/fetchData";
import { logout } from "@/lib/logout";
import QN_Button from "@/components/QN_Button";
import { QN_PopUp } from "@/components/QN_PopUp";
import { usePopUpGlobal } from "@/components/QN_PopUp/popup.global.context";

export default function LoggedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter()
    const [user, setUser] = useState<IUserData | null>()
    const {showPopUp} = usePopUpGlobal()

    const [logoutPopUp, setLogoutPopUp] = useState(false)

    const handleLogout = async () => {
        const response = await logout('nutritionist')
        if (response.status === 204 || response.status === 401) {
            router.push('/home')
            document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
            localStorage.removeItem('user')
            localStorage.removeItem('role')
            setTimeout(() => {
                showPopUp({
                    title: 'Você foi desconectado',
                    padding: '15px',
                    okButton: true
                })
            }, 300)
        }
    }

    useEffect(() => {
        const userData = localStorage.getItem('user')

        if (userData) {
            setUser(JSON.parse(userData))
        }
    }, [])

    const handleProfileNavigation = () => {
        router.push('/profile')
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
            <QN_Navbar
                header={
                    <>
                        <div style={{ cursor: 'pointer' }}>
                            <Avatar
                                showFallback src='https://images.unsplash.com/broken'
                                className='w-20 h-20 text-large'
                                onClick={handleProfileNavigation}
                            />
                        </div>
                        <Tooltip content='Navegar para o perfil'>
                            <h1 onClick={handleProfileNavigation} style={{ cursor: 'pointer' }}>{`Olá, ${user?.name || ''}!`}</h1>
                        </Tooltip>
                    </>}

                footer={
                    <>
                        <div style={{
                            height: '10%',
                            marginTop: 'auto',
                            marginBottom: '20px',
                            display: 'flex',
                            flexDirection: 'column',
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
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                <QN_Button
                                    colorStyle='red'
                                    width='40%'
                                    onClick={handleLogout}
                                >
                                    Sair
                                </QN_Button>
                            </div>

                        </div>

                    </>
                }
            >
                <NavbarItem name='Home' link='/home' image={<RiHome2Fill color='#23a3ff' size={30} />} />
                <NavbarItem name='Pacientes' link='/patients' image={<FaUsers color='#23a3ff' size={30} />} />
            </QN_Navbar>
            <div style={{ flexGrow: 1, padding: '20px' }}>
                {children}
            </div>
            <QN_PopUp
                isPopUpOpen={logoutPopUp}
                setPopUpOpen={setLogoutPopUp}
                config={
                    {
                        message: 'Você foi desconectado',
                        okButton: true
                    }
                }
            />
        </div>
    )
}