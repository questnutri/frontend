'use client'

import PatientsPage from "@/components/Pages/PatientsPage"
import QN_ConditionalRender from "@/components/QN_Components/QN_ConditionalRender"
import LoadingScreen from "@/components/QN_Components/QN_Video"
import QN_NutritionistPatient_DietPage from "@/components/QN_Feature/Display/Patient/Diet/DietDisplay"
import { NutritionistPatientContext } from "@/context/modal.patient.context"
import { fetchSelfPatient } from "@/lib/fetchPatients"
import { IPatient } from "@/models/Patient/Patient.interface"
import { useEffect, useState } from "react"

export default function HomePage() {

    return (
        <QN_ConditionalRender
            nutritionist={
                <>
                    <PatientsPage />
                </>}
            patient={<>

                <QN_NutritionistPatient_DietPage />

            </>}
        />

    )
}