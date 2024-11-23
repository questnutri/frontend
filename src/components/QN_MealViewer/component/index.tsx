import { useMealViewer } from "../context"
import QN_MealViewer_Component_Header from "./header"

export default function QN_MealViewer_Component() {
    const {isOpened, toggleOpened} = useMealViewer()
    return (
        <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'start',
                    width: '100%',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    transition: 'height 0.3s ease',
                    minHeight: '45px',
                    height: isOpened ? '350px' : '50px',
                }}
            >
                <QN_MealViewer_Component_Header  />
            </div>
    )
}