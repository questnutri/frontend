'use client'
import QN_PopUpGlobalProvider from '@/components/QN_PopUp/popup.global'
import { NextUIProvider } from '@nextui-org/react'
export default function App({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <NextUIProvider>
                <QN_PopUpGlobalProvider>
                    {children}
                </QN_PopUpGlobalProvider>
            </NextUIProvider>
        </>
    )
}