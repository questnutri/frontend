'use client'
import QN_ConditionalRender from "@/components/QN_Components/QN_ConditionalRender"
import QN_DietDisplay_Meal from "@/components/QN_Components/QN_DietDisplay_Meal"

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
                        <QN_DietDisplay_Meal />
                    </div>
                }
            />
        </>
    )
}