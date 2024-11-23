'use client'
import QN_ConditionalRender from "@/components/QN_ConditionalRender"
import QN_MealViewer from "@/components/QN_MealViewer"

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
                        <QN_MealViewer />
                    </div>
                }
            />
        </>
    )
}