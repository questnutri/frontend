'use client'
import { useNutritionistPatient } from "@/context/modal.patient.context"
import React, { useEffect, useState } from "react"
import { FaAppleAlt, FaHeartPulse, FaUser } from "@/icons"

import QN_NutritionistPatient_DietPage from "@/components/QN_Feature/Display/Patient/Diet/DietDisplay"
import QN_NutritionistPatient_HealthPage from "@/components/Nutritionist/NutritionistPatient/Health"
import QN_NutritionistPatient_ProfilePage from "@/components/Nutritionist/NutritionistPatient/Profile"
import QN_NutritionistPatient_Navbar from "@/components/Nutritionist/NutritionistPatient/Navbar"
import QN_Modal from "@/components/QN_Components/QN_Modal"

export default function QN_PatientModal() {
    const { patient, setModalPatient } = useNutritionistPatient()
    const [isModalOpen, setModalOpen] = useState(false)
    

    useEffect(() => {
        if (patient) {
            console.log(patient)
            setModalOpen(true)
        } else {
            setModalOpen(false)
        }
    }, [patient])

    const profilePage = () => {
        return (
            <QN_NutritionistPatient_ProfilePage />
        )
    }

    const dietPage = () => {
        return (
            <QN_NutritionistPatient_DietPage />
        )
    }

    const healthPage = () => {
        return (
            <QN_NutritionistPatient_HealthPage />
        )
    }

    const [currentPage, setCurrentPage] = useState(profilePage)
    const handleCloseModal = () => {
        setModalPatient(null)
        setModalOpen(false)
        setCurrentPage(profilePage)
    }

    return (
        <QN_Modal isOpen={isModalOpen} setOpen={handleCloseModal}>
            <div style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                boxSizing: 'border-box'
            }}>
                <QN_NutritionistPatient_Navbar
                    items={[
                        {
                            name: 'Perfil',
                            icon: <FaUser color='#23a3ff' size={30} />,
                            onClick: () => {
                                setCurrentPage(profilePage)
                            }
                        },
                        {
                            name: 'Saúde',
                            icon: <FaHeartPulse color='#23a3ff' size={30} />,
                            onClick() {
                                setCurrentPage(healthPage)
                            },
                        },
                        {
                            name: 'Dieta',
                            icon: <FaAppleAlt color='#23a3ff' size={30} />,
                            onClick: () => {
                                setCurrentPage(dietPage)
                            }
                        },

                    ]}
                />
                <div style={{width: '100%', height:'100%', boxSizing: 'border-box', overflow: 'hidden'}}>
                    {
                        currentPage
                    }
                </div>

            </div>
        </QN_Modal>
    )
}