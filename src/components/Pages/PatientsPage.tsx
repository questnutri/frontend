'use client'

import QN_Table from "@/components/QN_Components/QN_Table"
import { fetchPatients } from "@/lib/fetchPatients"
import { useEffect, useState } from "react"
import { useNutritionistPatient } from "@/context/modal.patient.context"
import QN_PatientModal from "@/components/QN_Feature/Display/Patient/QN_PatientModal"
import { IPatient } from "@/models/Patient/Patient.interface"
import { ListPatientsContext } from "@/components/Pages/ListPatients/context"
import ListPatientsPage from "@/components/Pages/ListPatients"
import QN_Button from "@/components/QN_Components/QN_Button"
import QN_Modal from "@/components/QN_Components/QN_Modal"
import { FaPlus } from '@/icons/index'
import QN_NewPatient from "@/components/QN_Feature/Display/Patient/QN_NewPatient"

export default function PatientsPage() {
    const [patients, setPatients] = useState<IPatient[]>([])
    const { setModalPatient } = useNutritionistPatient()
    const [modalNewPatient, setModalNewPatient] = useState(false)

    const handleRowClick = async (id: string | null) => {
        setModalPatient(id)
    }

    const refreshList = async () => {
        const data = await fetchPatients()
        setPatients(data)
    }

    useEffect(() => {
        refreshList()
    }, [])


    return (
        <ListPatientsContext.Provider value={{ patients, setPatients, refreshList }}>
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'start',
                    alignItems: 'start',
                    gap: '30px',
                    flexDirection: 'column',
                    padding: '30px',
                    backgroundColor: '#55B7FE',
                    height: '100%',
                    borderRadius: '15px',
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', }}>
                    <h1 style={{ fontSize: '25px', fontWeight: '700', color: 'white' }}>Controle de Pacientes</h1>
                    <div style={{ marginLeft: '100px' }}>
                        <QN_Button
                            colorStyle="white"
                            onClick={() => setModalNewPatient(true)}
                            width="fit-content"
                            startContent={<FaPlus size={20} />}
                        >
                            Novo Paciente
                        </QN_Button>
                    </div>

                </div>
                <ListPatientsPage />
            </div>
            <QN_Modal isOpen={modalNewPatient} setOpen={setModalNewPatient} height="fit-content" width="1000px">
                <QN_NewPatient />
            </QN_Modal>
        </ListPatientsContext.Provider>
    )
}
