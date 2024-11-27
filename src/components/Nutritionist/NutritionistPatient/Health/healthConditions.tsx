'use client'
import QN_Navbar from "@/components/QN_Components/QN_Navbar";
import { GiMedicalThermometer, GiMedicines, LuActivity } from '@/icons'
import { useState } from "react";
import MedicineSubpage from "./internalPages/medicine.subpage";

export default function HealthConditions() {

    const medicineSubPage = () => {
        return <MedicineSubpage />
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
                            icon: <GiMedicines size={'25px'} color="white"/>,
                            onClick: () => {
                                setRenderedContent(medicineSubPage)
                            }
                        },
                        {
                            name: 'Alergias',
                            icon: <GiMedicalThermometer size={'25px'} color="white"/>,
                            onClick: () => {
                                setRenderedContent(<>Alergias</>)
                            }
                        },
                        {
                            name: 'Doenças crônicas',
                            icon: <LuActivity size={'25px'} color="white"/>,
                            onClick: () => {
                                setRenderedContent(<>Doenças</>)
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
                        backgroudColor: 'white',
                        iconColor: '#55B7FE',
                        fontWeight: '600'
                    },
                    hoverItem: {
                        textColor: 'white',
                        backgroudColor: '#676767',
                        iconColor: 'white',
                    }
                }}
            />
            {renderedContent}

        </div>
    )
}