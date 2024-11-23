import QN_MealViewer from "@/components/QN_ModalViewer"

export default function QN_NutritionistPatient_DietPage() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'center',
                width: '100%',
                padding: '20px',
                backgroundColor: '#55B7FE',
                gap: '20px'
            }}
        >
            <h1>
                Diet Page
            </h1>
            <QN_MealViewer />
        </div>
    )
}