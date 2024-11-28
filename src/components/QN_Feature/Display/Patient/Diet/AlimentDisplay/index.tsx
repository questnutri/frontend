import { useFood } from "../FoodDisplay/context"

export default function AlimentDisplay() {
    const {food} = useFood()
    return (
        <div style={{backgroundColor: "#ee0000", width: '100%', height: "100%"}}>
            a
        </div>
    )
}