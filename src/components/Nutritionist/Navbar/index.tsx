'use client'
import QN_Navbar from "@/components/QN_Navbar"
import NutritionistNavbarHeader from "./header"
import { RiHome2Fill, FaUsers } from '../../../icons'
import { useRouter } from "next/navigation"
import NutritionistNavbarFooter from "./footer"
import { IUser, useUser } from "@/context/user.context"

export default function NutritionistNavbar() {
    const router = useRouter()
    const {user} = useUser()
    
    return (
        <QN_Navbar
            header={
                <NutritionistNavbarHeader user={user as IUser} />
            }
            items={
                [
                    {
                        name: 'Home',
                        icon: <RiHome2Fill color='#23a3ff' size={30} />,
                        isSelected: false,
                        onClick: () => {
                            router.push('/home')
                        }
                    },
                    {
                        name: 'Pacientes',
                        icon: <FaUsers color='#23a3ff' size={30} />,
                        onClick: () => {
                            router.push('/patients')
                        }
                    },
                ]
            }
            footer={
                <NutritionistNavbarFooter />
            }
            setFirstSelected={0}
        />
    )
}