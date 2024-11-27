'use client'
import QN_PatientModal from "@/components/QN_Components/QN_PatientModal";
import QN_Table from "@/components/QN_Components/QN_Table";
import { useNutritionistPatient } from "@/context/modal.patient.context";
import { useListPatients } from "./context";
import { useEffect, useState } from "react";
import { IPatient } from "@/models/Patient/Patient.interface";
import QN_DropDown from "@/components/QN_Components/QN_DropDown";
import QN_Input from "@/components/QN_Components/QN_Input";

export default function ListPatientsPage() {
    const { patients, setPatients } = useListPatients()
    const { setModalPatient } = useNutritionistPatient()

    const handleRowClick = async (id: string | null) => {
        setModalPatient(id)
    }

    const searchTypes = [
        {
            label: 'Nome',
            value: 'name'
        },
        {
            label: 'E-mail',
            value: 'email'
        },
        {
            label: 'Data de nascimento',
            value: 'birth'
        },
        {
            label: 'CPF',
            value: 'cpf'
        },
        {
            label: 'Telefone/Celular',
            value: 'phone'
        }
    ]

    const [filter, setFilter] = useState('')
    const [filterType, setFilterType] = useState(searchTypes[0].value)
    const [filteredPatients, setFilteredPatients] = useState<IPatient[]>([])

    useEffect(() => {
        setFilteredPatients(
            patients.filter((patient) => {
                const searchValue = filter.toLocaleLowerCase()
                switch (filterType) {
                    case searchTypes[0].value: {
                        const fullName = `${patient.firstName ?? ''} ${patient.lastName ?? ''}`.toLocaleLowerCase()
                        return fullName.includes(searchValue)
                    }
                    case searchTypes[1].value: {
                        const email = patient.email?.toLocaleLowerCase() ?? ''
                        return email.includes(searchValue)
                    }
                    case searchTypes[2].value: {
                        const birth = patient.details?.birth?.toDateString().toLocaleLowerCase() ?? ''
                        return birth.includes(searchValue)
                    }
                    case searchTypes[3].value: {
                        const cpf = patient.details?.cpf?.toLocaleLowerCase() ?? ''
                        return cpf.includes(searchValue)
                    }

                    case searchTypes[4].value: {
                        const phone = patient.details?.phone?.toLocaleLowerCase() ?? ''
                        return phone.includes(searchValue)
                    }
                }
            })
        )
    }, [patients, filter, filterType])

    return (
        <>
            <div style={{ display: 'flex', width: '100%' }}>
                <QN_DropDown
                    value={filterType}
                    onChange={setFilterType}
                    items={searchTypes}
                    widthButton='25%'
                    label="Pesquisar Por"
                />
                <QN_Input
                    version={2}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    clearable
                    label="Termos de Pesquisa"
                />
            </div>

            <QN_Table
                columns={[
                    { key: 'firstName', label: searchTypes[0].label, render: (value, row) => `${value} ${row.lastName ?? ''}`.trim() },
                    { key: 'email', label: searchTypes[1].label },
                    { key: 'details.birth', label: searchTypes[2].label },
                    { key: 'details.cpf', label: searchTypes[3].label },
                    { key: 'details.phone', label: searchTypes[4].label },
                ]}
                rows={filteredPatients}
                onRowClick={handleRowClick}
            />
            <QN_PatientModal />
        </>
    )
}
