'use client'
import { NextUIProvider } from '@nextui-org/react'
export default function App({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <NextUIProvider>
                    {children}
            </NextUIProvider>
        </>
    )
}