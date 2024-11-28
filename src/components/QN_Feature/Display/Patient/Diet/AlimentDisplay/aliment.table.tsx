import QN_Table from "@/components/QN_Components/QN_Table";
import { fetchAliments } from "@/lib/fetchAliment";
import { IAliment } from "@/models/Aliment.interface";
import { useEffect, useState } from "react";

export default function AlimentTable() {
    const handleRowClick = () => {

    }
    const [aliments, setAliments] = useState<IAliment[]>([])
    useEffect(() => {
        const getAliments = async () => {
            const data = await fetchAliments()
            setAliments(data as IAliment[])
        }
        getAliments()
    }, [])

    return (
        <div>
            <QN_Table
                rows={[...aliments]}
                columns={[
                    { key: 'name', label: 'Nome' },
                    { key: 'kcal', label: 'Calorias' },
                    { key: 'carb', label: 'Carboidratos' },
                    { key: 'protein', label: 'Proteínas' },
                    { key: 'fat', label: 'Gordura' }
                ]}
            />
        </div>

    )
}