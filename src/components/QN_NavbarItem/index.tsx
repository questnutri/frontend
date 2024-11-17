'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface QN_NavbarItemProps {
    name: string
    image?: React.ReactNode
}

export default function NavbarItem({ name, image }: QN_NavbarItemProps) {
    const pathname = usePathname();

    return (
        <Link href={'/home'}>
            <div className="w-full h-fit p-[5px_20px] flex justify-start items-center gap-[15px] hover:bg-[#767777] rounded-lg transition-transform transition-colors duration-500">
                <div>
                    {image}
                </div>
                <div>
                    <p className="text-[18px]">{name}</p>
                </div>
            </div>
        </Link>
    );
}
