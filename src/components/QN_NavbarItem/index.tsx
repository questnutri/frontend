'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface QN_NavbarItemProps {
    name: string
    link: string
    image?: React.ReactNode
}

export default function NavbarItem({ name, link, image }: QN_NavbarItemProps) {
    const pathname = usePathname()

    return (
        <Link href={link}>
            <div className="w-full h-fit p-[5px_20px] flex justify-start items-center gap-[15px] hover:bg-[#767777] rounded-lg transition-transform transition-colors duration-500">
                <div>
                    {image}
                </div>
                <div>
                    <p className="text-[15px]"
                        style={{
                            textDecoration: link == pathname ? 'underline' : '',
                        }}
                    >{name}</p>
                </div>
            </div>
        </Link>
    );
}
