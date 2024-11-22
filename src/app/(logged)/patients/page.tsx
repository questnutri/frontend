'use client'

import QN_Table from "@/components/QN_Table"
import { fetchPatients } from "@/lib/fetchPatients"
import { useEffect, useState } from "react"
import { useNutritionistPatient } from "@/context/modal.patient.context"
import QN_PatientModal from "@/components/QN_PatientModal"
import { IPatient } from "@/models/Patient/Patient.interface"

export default function PatientsPage() {
    const [patients, setPatients] = useState<IPatient[]>([])
    const { setModalPatient } = useNutritionistPatient()

    const handleRowClick = async (id: string | null) => {
        setModalPatient(id)
    }

    useEffect(() => {
        const getPatients = async () => {
            const data = await fetchPatients()
            setPatients(data)
        }
        getPatients()
    }, [])

    return (
        <>
            <h1 style={{ padding: '30px' }}>
                Patients Page
            </h1>
            <QN_Table
                columns={[
                    { key: 'firstName', label: 'Nome' },
                    { key: 'email', label: 'E-mail' }
                ]}
                rows={patients}
                onRowClick={handleRowClick}
            />
            <QN_PatientModal />
        </>
    )
}
