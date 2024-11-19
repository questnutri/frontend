'use client'

import QN_Table from "@/components/QN_Table"
import { fetchOnePatient, fetchPatients, IPatientData } from "@/lib/fetchPatients"
import { useEffect, useState } from "react"
import QN_Modal  from "@/components/QN_Modal"
import QN_Navbar from "@/components/QN_Navbar"
import QN_Button from "@/components/QN_Button"
import QN_Patient_NutriView from "@/components/QN_Patient/QN_Patient_NutriView"

export default function PatientsPage() {
    const [patients, setPatients] = useState<IPatientData[]>([])
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [patient, setPatient] = useState<IPatientData | null>(null)

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const getPatients = async () => {
            const data = await fetchPatients()
            setPatients(data)
        }

        getPatients()
    }, [])

    const handleRowClick = async (id: string | null) => {
        setIsOpen(true)
    }

    return (
        <h1 style={{ padding: '30px' }}>
            Patients Page
            <QN_Table
                columns={[
                    { key: 'name', label: 'Nome' },
                    { key: 'email', label: 'E-mail' }
                ]}
                rows={patients}
                onRowClick={handleRowClick}
            />

            <QN_Modal isOpen={isOpen} setOpen={setIsOpen}>
                <div style={{ display: 'flex', height: '100vh' }}>
                    <QN_Navbar
                        footer={
                            <QN_Button onClick={() => setIsOpen(false)}>Fechar</QN_Button>
                        }
                    >
                        <div></div>
                    </QN_Navbar>
                </div>
            </QN_Modal>
        </h1>
    )
}
