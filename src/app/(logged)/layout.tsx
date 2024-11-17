'use client'
import QN_Navbar from "@/components/QN_Navbar";
import NavbarItem from "@/components/QN_NavbarItem";
import { RiHome2Fill, LuCalendarClock } from '../../icons/index'

export default function LoggedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <QN_Navbar>
                <NavbarItem name="Home" image={<RiHome2Fill color="#23a3ff" size={30} />} />
                <NavbarItem name="Profile" image={<LuCalendarClock color="#23a3ff" size={30} />} />
            </QN_Navbar>
            {children}
        </div>
    )
}
