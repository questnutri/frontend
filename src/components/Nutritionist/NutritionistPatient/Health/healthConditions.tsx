'use client'
import QN_Navbar from "@/components/QN_Components/QN_Navbar";
import { GiMedicalThermometer, GiMedicines, LuActivity } from '@/icons'
import { useState } from "react";
import MedicineSubpage from "./internalPages/medication.subpage";
import AllergiesSubpage from "./internalPages/allergies/allergies.subpage";
import ChronicDiseasesSubPage from "./internalPages/chronicDiseases/diseases.subpage";

export default function HealthConditions() {

    const medicineSubPage = () => {
        return <MedicineSubpage />
    }

    const allergiesSubPage = () => {
        return <AllergiesSubpage />
    }

    const chronicDiseasesSubPage = () => {
        return <ChronicDiseasesSubPage />
    }

    const [renderedContent, setRenderedContent] = useState(medicineSubPage)


    return (
        <div style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            border: '2px solid',
            borderRadius: '10px',
            borderColor: '#E4E4E7',
            overflow: 'hidden',
        }}>
            <QN_Navbar
                items={
                    [
                        {
                            name: 'Medicamentos',
                            icon: <GiMedicines size={'25px'} color="white" />,
                            onClick: () => {
                                setRenderedContent(medicineSubPage)
                            }
                        },
                        {
                            name: 'Alergias',
                            icon: <GiMedicalThermometer size={'25px'} color="white" />,
                            onClick: () => {
                                setRenderedContent(allergiesSubPage)
                            }
                        },
                        {
                            name: 'Doenças crônicas',
                            icon: <LuActivity size={'25px'} color="white" />,
                            onClick: () => {
                                setRenderedContent(chronicDiseasesSubPage)
                            }
                        }
                    ]
                }
                setFirstSelected={0}
                styleConfig={{
                    fontWeight: '500',
                    textColor: 'white',
                    backgroundColor: "#55B7FE",
                    selectedItem: {
                        textColor: '#55B7FE',
                        backgroundColor: 'white',
                        iconColor: '#55B7FE',
                        fontWeight: '600'
                    },
                    hoverItem: {
                        textColor: 'white',
                        backgroundColor: '#676767',
                        iconColor: 'white',
                    }
                }}
            />
            {renderedContent}

        </div>
    )
}