'use client'
import { useNutritionistPatient } from "@/context/modal.patient.context"
import React, { useEffect, useState } from "react"
import QN_Modal from "../QN_Modal"
import QN_NutritionistPatient_Navbar from "../../Nutritionist/NutritionistPatient/Navbar"
import QN_NutritionistPatient_ProfilePage from "../../Nutritionist/NutritionistPatient/Profile"
import { FaUser, FaAppleAlt, FaHeartPulse } from '../../../icons'
import QN_NutritionistPatient_HealthPage from "../../Nutritionist/NutritionistPatient/Health"
import QN_NutritionistPatient_DietPage from "@/components/Nutritionist/NutritionistPatient/DietDisplay"
import HealthPage2 from "@/components/Nutritionist/NutritionistPatient/Health/index.2"

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

    const healthPage2 = () => {
        return (
            <HealthPage2 />
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
                            name: 'Saúde2',
                            icon: <FaHeartPulse color='#23a3ff' size={30} />,
                            onClick() {
                                setCurrentPage(healthPage2)
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