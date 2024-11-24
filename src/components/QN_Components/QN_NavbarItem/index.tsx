'use client'

export interface QN_NavbarItemProps {
    name: string
    icon?: React.ReactNode
    isSelected?: boolean
    onClick?: () => void
}

export default function NavbarItem({ name, icon, isSelected = false, onClick }: QN_NavbarItemProps) {
    return (
        <div
            className="w-full h-fit p-[5px_20px] flex justify-start items-center gap-[15px] hover:bg-[#767777] rounded-lg transition-transform transition-colors duration-500"
            style={{
                cursor: 'pointer'
            }}
            onClick={onClick}
        >
            <div>
                {icon}
            </div>
            <div>
                <p className="text-[15px]"
                    style={{
                        textDecoration: isSelected ? 'underline' : '',
                    }}
                >{name}</p>
            </div>
        </div>
    )
}
