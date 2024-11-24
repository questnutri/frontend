'use client'
import { NavbarItemContext } from "@/components/QN_Components/QN_Navbar/navbar.context"
import { useUser } from "@/context/user.context"
import { Avatar, Tooltip } from "@nextui-org/react"
import { useRouter } from "next/navigation"

export default function QN_NavbarHeader_Default() {
    const {user} = useUser()
    const router = useRouter()
    return (
        <NavbarItemContext.Consumer>
            {navbarContext => {
                const handleProfileNavigation = () => {
                    router.push('/profile')
                    navbarContext?.toggleSelection(-1)
                }
                return (
                    <>
                        <div style={{ cursor: 'pointer' }}>
                            <Avatar
                                showFallback src='https://images.unsplash.com/broken'
                                className='w-20 h-20 text-large'
                                onClick={handleProfileNavigation}
                            />
                        </div>
                        <Tooltip content='Navegar para o perfil'>
                            <h1 onClick={handleProfileNavigation}
                                style={{ cursor: 'pointer' }}
                            >
                                {`Olá, ${user?.firstName || ''}!`}
                            </h1>
                        </Tooltip>
                    </>
                )
            }
            }
        </NavbarItemContext.Consumer>
    )
}