import QN_Table from "@/components/QN_Components/QN_Table";
import { fetchAliments } from "@/lib/fetchAliment";
import { IAliment } from "@/models/Aliment.interface";
import { useEffect, useState } from "react";

export default function AlimentTable() {
    const handleRowClick = () => {

    }
    const [aliments, setAliments] = useState<any>([])
    useEffect(() => {
        const getAliments = async () => {
            const data = await fetchAliments()
            setAliments(data)
        }
        getAliments()
    }, [])

    return (
        <div>
            <QN_Table
                rows={aliments}
                columns={[
                    { key: 'name', label: 'Nome' },
                    { key: 'kcal', label: 'Calorias' },
                    // {key}
                ]}

                onRowClick={handleRowClick}
            />
        </div>

    )
}