'use client'
import QN_Navbar from "@/components/QN_Components/QN_Navbar"
import { FaAppleAlt, RiHome2Fill } from '@/icons'
import { usePathname, useRouter } from "next/navigation"
import QN_NavbarFooter_Default from "@/components/QN_Components/QN_Navbar/default/navbar_footer.default"
import QN_NavbarHeader_Default from "@/components/QN_Components/QN_Navbar/default/navbar_header.default"

export default function PatientNavbar() {
    const router = useRouter()
    const pathName = usePathname()

    const routesPathName = ['/home']
    
    return (
        <QN_Navbar
            header={
                <QN_NavbarHeader_Default />
            }
            items={
                [
                    {
                        name: 'Dieta',
                        icon: <FaAppleAlt color='#23a3ff' size={30} />,
                        isSelected: false,
                        onClick: () => {
                            router.push(routesPathName[0])
                        }
                    },
                ]
            }
            footer={
                <QN_NavbarFooter_Default />
            }
            setFirstSelected={routesPathName.findIndex(route => route === pathName)}
        />
    )
}