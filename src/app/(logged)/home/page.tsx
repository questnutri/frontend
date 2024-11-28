'use client'
import QN_AlimentInfo from "@/components/QN_Components/QN_AlimentInfo"
import QN_ConditionalRender from "@/components/QN_Components/QN_ConditionalRender"
import { QN_PopUp } from "@/components/QN_Components/QN_PopUp"
import QN_Table from "@/components/QN_Components/QN_Table"
import { fetchAliments, fetchOneAliment } from "@/lib/fetchAliment"
import { IAliment } from "@/models/Aliment.interface"
import { useEffect, useState } from "react"

export default function HomePage() {
    const [aliments, setAliments] = useState<IAliment[]>([])
    const [isPopUpOpened, setIsPopUpOpened] = useState(false)
    const [selectedAliment, setSelectedAliment] = useState<IAliment | null>(null)

    const handleRowClick = async (id: string | null) => {
        if (id) {
            const data = await fetchOneAliment(id)
            setSelectedAliment(data)
        }

    }

    useEffect(() => {
        if (selectedAliment) {
            setIsPopUpOpened(true)
        }
    }, [selectedAliment])

    useEffect(() => {
        const getAliments = async () => {
            const data = await fetchAliments()
            setAliments(data)
        }
        getAliments()
    }, [])


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
            <div
                style={{
                    height: '80%',
                    overflowY: 'auto',
                    width: '100%'
                }}
            >
                <QN_Table
                    columns={[
                        { key: 'name', label: 'Nome' },
                        { key: 'kcal', label: 'Calorias' },
                        { key: 'carb', label: 'Carboidratos' },
                        { key: 'protein', label: 'Proteína' },
                        { key: 'fat', label: 'Gordura' },
                    ]}
                    rows={aliments}
                    onRowClick={handleRowClick}
                />
            </div>
            <QN_PopUp
                styleConfig={{
                    bodyConfig: {
                        content: <QN_AlimentInfo aliment={selectedAliment} />
                    },
                    windowConfig: {
                        padding: '0px',
                        width: '90%',
                        height: '90%',

                    }

                }}
                isPopUpOpen={isPopUpOpened}
                setPopUpOpen={setIsPopUpOpened}
            />
        </div>
    )
}