'use client'
import QN_Navbar from "@/components/QN_Navbar";
import NavbarItem from "@/components/QN_NavbarItem";
import { RiHome2Fill, LuCalendarClock } from '../../icons/index'

export default function LoggedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
            <QN_Navbar>
                <NavbarItem name='Home' link='/home' image={<RiHome2Fill color='#23a3ff' size={30} />} />
                <NavbarItem name='Perfil' link='/profile' image={<LuCalendarClock color='#23a3ff' size={30} />} />
            </QN_Navbar>
            <div style={{ flexGrow: 1, padding: '20px' }}>
                {children}
            </div>
        </div>
    )
}