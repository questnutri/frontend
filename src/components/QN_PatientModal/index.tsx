'use client'
import { useNutritionistPatient } from "@/context/modal.patient.context"
import React, { useEffect, useState } from "react"
import QN_Modal from "../QN_Modal"
import QN_NutritionistPatient_Navbar from "../Nutritionist/NutritionistPatient/Navbar"
import QN_NutritionistPatient_ProfilePage from "../Nutritionist/NutritionistPatient/Profile"
import { FaUser, FaAppleAlt } from '../../icons'
import QN_NutritionistPatient_DietPage from "../Nutritionist/NutritionistPatient/Diet"

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

    const handleCloseModal = () => {
        setModalPatient(null)
        setModalOpen(false)
    }

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

    const [currentPage, setCurrentPage] = useState(profilePage)

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
                            name: 'Dieta',
                            icon: <FaAppleAlt color='#23a3ff' size={30} />,
                            onClick: () => {
                                setCurrentPage(dietPage)
                            }
                        }
                    ]}
                />
                {
                    currentPage
                }
            </div>
        </QN_Modal>
    )
}