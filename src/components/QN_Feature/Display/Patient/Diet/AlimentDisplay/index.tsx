import { useFood } from "../FoodDisplay/context"

export default function AlimentDisplay() {
    const { food } = useFood()
    return (
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: "#ee0000", width: '100%', height: "100%", minHeight: '100%'}}>
            <h1>Alimento Principal</h1>
        </div>
    )
}