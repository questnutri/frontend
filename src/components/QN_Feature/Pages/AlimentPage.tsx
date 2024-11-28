'use client'

import QN_Table from "@/components/QN_Components/QN_Table"
import { fetchAliments } from "@/lib/fetchAliment"
import { IAliment } from "@/models/Aliment.interface"
import { useEffect, useState } from "react"
import QN_Input from "@/components/QN_Components/QN_Input"
import { FaSearch } from "@/icons/index"
import { usePopUpGlobal } from "@/components/QN_Components/QN_PopUp/popup.global.context"
import { useFood } from "../Display/Patient/Diet/FoodDisplay/context"
import { usePopUp } from "@/components/QN_Components/QN_PopUp/popup.context"
import { updateFood } from "@/lib/Diet/diet.api"
import { useNutritionistPatient } from "@/context/modal.patient.context"
import { useDiet, useMeal } from "@/context/diet.context"

export default function AlimentPage() {
    const {showPopUp} = usePopUpGlobal()
    const {closePopUp} = usePopUp()
    const {food} = useFood()
    const {patient, fetchPatient} = useNutritionistPatient()
    const {diet} = useDiet()
    const {meal} = useMeal()

    const [aliments, setAliments] = useState<IAliment[]>([])
    const [filter, setFilter] = useState('') // Estado para o filtro
    const [filteredAliments, setFilteredAliments] = useState<IAliment[]>([])

    useEffect(() => {
        const getAliments = async () => {
            const data = await fetchAliments()
            setAliments(data)
        }
        getAliments()
    }, [])

    useEffect(() => {
        setFilteredAliments(
            aliments.filter((aliment) => {
                const searchValue = filter.toLocaleLowerCase()
                return aliment.name.toLocaleLowerCase().includes(searchValue) // Filtro por nome
            })
        )
    }, [aliments, filter])

    const handleRowClick = (row: any) => {
        showPopUp({
            titleConfig: {
                title: 'Você deseja selecionar o alimento',
            }, 
            customButtons: {
                items: [
                    {
                        text: 'Não', 
                        colorStyle: 'red',
                        onClick: () => {}
                    }, 
                    {
                        text: 'Sim',
                        onClick: async () => {
                            await updateFood(patient!._id, diet!._id, meal!._id, food!._id, {
                                aliment: row
                            })

                            await fetchPatient()
                            
                            closePopUp()
                        }
                    }
                ]
            }
        })
    }

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
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '15px',
                    marginBottom: '20px',
                    width: '100%'
                }}
            >
                <QN_Input
                    version={2}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    clearable
                    label="Pesquisar Alimento"
                    startContent={<FaSearch style={{marginRight: '20px'}} />}
                />
            </div>

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
                    rows={filteredAliments}
                    onRowClick={handleRowClick}
                />
            </div>
        </div>
    )
}
