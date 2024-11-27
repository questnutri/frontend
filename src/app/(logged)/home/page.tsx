'use client'
import QN_ConditionalRender from "@/components/QN_Components/QN_ConditionalRender"

export default function HomePage() {
    return (
        <>
            <QN_ConditionalRender
                nutritionist={
                    <h1 style={{ padding: '30px' }}>
                        Home Page
                    </h1>
                }
                patient={
                    <div style={{ backgroundColor: 'blue' }}>
                    </div>
                }
            />
        </>
    )
}