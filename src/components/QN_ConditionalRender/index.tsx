'use client'

import { useUser } from "@/context/user.context"

interface QN_ConditionalRenderProps {
    nutritionist?: React.ReactNode
    patient?: React.ReactNode
    admin?: React.ReactNode
}

export default function QN_ConditionalRender({
    nutritionist=(<></>), 
    patient=(<></>), 
    admin=(<></>)
}: QN_ConditionalRenderProps) {
    const {role} = useUser()
    
    switch(role) {
        case 'nutritionist':
            return nutritionist
        case 'patient':
            return patient
        case 'admin':
            return admin
        default:
            <></>
    }
}