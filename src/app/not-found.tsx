'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface Props {
    titulo: string,
    limite: number
}

export default function NotFound() {
    const router = useRouter()
    
    useEffect(() => {
        router.push('/404')
    }, [])

    return (
        
        <>
            404
        </>
    )
}