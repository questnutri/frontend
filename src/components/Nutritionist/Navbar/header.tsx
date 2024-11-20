import { NavbarItemContext } from "@/components/QN_Navbar/navbar.context"
import { IUser } from "@/context/user.context"
import { Avatar, Tooltip } from "@nextui-org/react"
import { useRouter } from "next/navigation"

interface NutritionistNavbarHeaderProps {
    user: IUser
}

export default function NutritionistNavbarHeader({ user }: NutritionistNavbarHeaderProps) {
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
                                {`Olá, ${user?.name || ''}!`}
                            </h1>
                        </Tooltip>
                    </>
                )
            }
            }
        </NavbarItemContext.Consumer>
    )
}