'use client'

import QN_Table from "@/components/QN_Components/QN_Table"
import { fetchAliments } from "@/lib/fetchAliment"
import { IAliment } from "@/models/Aliment.interface"
import { useEffect, useState, useCallback } from "react"
import QN_Input from "@/components/QN_Components/QN_Input"
import { FaSearch } from "@/icons/index"
import { usePopUpGlobal } from "@/components/QN_Components/QN_PopUp/popup.global.context"
import { useFood } from "../Display/Patient/Diet/FoodDisplay/context"
import { usePopUp } from "@/components/QN_Components/QN_PopUp/popup.context"
import { updateFood } from "@/lib/Diet/diet.api"
import { useNutritionistPatient } from "@/context/modal.patient.context"
import { useDiet, useMeal } from "@/context/diet.context"
import { PaginatedResult } from "@/utils/interfaces/PaginatedResult.interface"

interface AlimentPageProps {
    setAliment: (value: IAliment | null) => void
}

export default function AlimentPage({ setAliment }: AlimentPageProps) {
    const { showPopUp } = usePopUpGlobal()
    const { closePopUp } = usePopUp()
    const { food } = useFood()
    const { patient, fetchPatient } = useNutritionistPatient()
    const { diet } = useDiet()
    const { meal } = useMeal()

    const rowsPerPage = 10

    const [paginatedAliments, setPaginatedAliments] = useState<PaginatedResult<IAliment> | undefined>(undefined)
    const [filter, setFilter] = useState('')
    const [debouncedFilter, setDebouncedFilter] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilter(filter)
            setCurrentPage(1) // reset página quando filtro muda
        }, 500)

        return () => clearTimeout(handler)
    }, [filter])

    const fetchPage = useCallback(async (page: number, size: number, nameFilter: string) => {
        const data = await fetchAliments(page, size, nameFilter)
        setPaginatedAliments(data)
        return data
    }, [])

    useEffect(() => {
        fetchPage(currentPage, rowsPerPage, debouncedFilter)
    }, [currentPage, rowsPerPage, debouncedFilter, fetchPage])

    const onFetchPage = useCallback(async (page: number, size: number) => {
        setCurrentPage(page)
        // Só retorna o estado atualizado, não faz fetch aqui de novo
        return paginatedAliments ?? { content: [], totalItems: 0, currentPage: 1, pageSize: size, totalPages: 1, isFirstPage: true, isLastPage: true }
    }, [paginatedAliments])

    const handleRowClick = (id: string) => {
        const selectedAliment = paginatedAliments?.content.find(a => a._id === id)
        if (!selectedAliment) return

        showPopUp({
            titleConfig: { title: 'Você deseja selecionar o alimento' },
            customButtons: {
                items: [
                    { text: 'Não', colorStyle: 'red', onClick: () => { } },
                    {
                        text: 'Sim',
                        onClick: async () => {
                            setAliment(selectedAliment);
                            // await updateFood(patient!._id, diet!._id, meal!._id, food!._id, { aliment: selectedAliment })
                            // await fetchPatient()
                        }
                    }
                ]
            }
        })
    }

    const safePaginatedResult = paginatedAliments
        ? {
            content: paginatedAliments.content,
            totalItems: paginatedAliments.totalItems ?? 0,
            currentPage: paginatedAliments.currentPage ?? 1,
            pageSize: paginatedAliments.pageSize ?? rowsPerPage,
            totalPages: paginatedAliments.totalPages ?? 1,
            isFirstPage: paginatedAliments.isFirstPage ?? true,
            isLastPage: paginatedAliments.isLastPage ?? true,
        }
        : undefined

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
                    startContent={<FaSearch style={{ marginRight: '20px' }} />}
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
                    rows={paginatedAliments?.content ?? []}
                    onRowClick={handleRowClick}
                    enablePagination
                    paginatedResult={safePaginatedResult}
                    onFetchPage={onFetchPage}
                    rowsPerPage={rowsPerPage}
                />
            </div>
        </div>
    )
}
