'use client'

import LoadingScreen from "@/components/QN_Components/QN_Video"

export default function HomePage() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'hidden',
                boxSizing: 'border-box',
                alignItems: 'start',
                width: '100%',
                height: '100%'
            }}
        >
            <h1 style={{ padding: '30px' }}>
                Home Page
            </h1>
        </div>
    )
}