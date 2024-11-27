import QN_Input from "@/components/QN_Components/QN_Input"
import QN_Navbar from "@/components/QN_Components/QN_Navbar"
import QN_TextArea from "@/components/QN_Components/QN_TextArea"
import { useState } from "react"
import HealthConditions from "./healthConditions"
import QN_Button from "@/components/QN_Components/QN_Button"

export default function HealthPage2() {
    const [goal, setGoal] = useState<string>('')
    const [routine, setRoutine] = useState('')
    const [foodPreference, setFoodPreference] = useState('')

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '30px',
            gap: '30px',
            height: '100%',
        }}>
            <div style={{}}>
                <QN_Input label={'Objetivo da dieta'} value={goal} onChange={(e) => setGoal(e.target.value)} />
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
                <QN_TextArea
                    label={'Rotina'}
                    value={routine}
                    onChange={(e) => setRoutine(e.target.value)}
                    maxRows={8}
                    minRows={8}
                    height='200px'
                    labelBtn={
                        <div style={{ paddingRight: '3px' }}>
                            <QN_Button
                                width='50px'
                                height='20px'
                                borderRadius='5px'
                                fontSize='12px'
                                noShadow
                            >
                                Salvar
                            </QN_Button>
                        </div>
                    }
                />
                <QN_TextArea
                    label={'Preferência alimentar'}
                    value={foodPreference}
                    onChange={(e) => setFoodPreference(e.target.value)}
                    maxRows={8}
                    minRows={8}
                    height='200px'
                    labelBtn={
                        <div style={{ paddingRight: '3px' }}>
                            <QN_Button
                                width='50px'
                                height='20px'
                                borderRadius='5px'
                                fontSize='12px'
                                noShadow
                            >
                                Salvar
                            </QN_Button>
                        </div>
                    }
                />

            </div>
            <HealthConditions />

        </div>
    )
}