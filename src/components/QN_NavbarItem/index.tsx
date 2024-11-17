'use client'
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface QN_NavbarItemProps {
    name: string
    image?: React.ReactNode
}

export default function NavbarItem({ name, image }: QN_NavbarItemProps) {
    const pathname = usePathname();

    return (
        <Link href={`/${name?.toLocaleLowerCase()}`}>
            <Button startContent={image} size="lg" style={{ backgroundColor: '#a4a4a4', justifyContent: 'start', gap: '10px' }}>
                <span style={{ textDecoration: pathname && String(pathname).toLocaleUpperCase() === `/${name?.toLocaleUpperCase()}` ? 'underline' : '', fontSize: '18px' }}>
                    {name}
                </span>
            </Button>
        </Link>
    );
}
