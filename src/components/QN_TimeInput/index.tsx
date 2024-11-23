import { TimeInput } from "@nextui-org/react"
import { Time } from "@internationalized/date"
import { FaRegClock } from '../../icons/index'

interface QN_TimeInputProps {
    label?: string
    value: string
    onChange?: (time: string) => void
    color?: 'black' | 'white' | '#55b7fe'
}

export default function QN_TimeInput({ label, value, onChange, color = 'black' }: QN_TimeInputProps) {

    const timeToString = (time: Time) => {
        const hours = time.hour.toString().padStart(2, '0')
        const minutes = time.minute.toString().padStart(2, '0')
        return `${hours}:${minutes}`
    }

    const stringToTime = (timeStr: string): Time => {
        try {
            const [hours, minutes] = timeStr.split(":").map(Number)
            return new Time(hours || 0, minutes || 0)
        } catch {
            return new Time(0, 0)
        }
    }

    const handleTimeChange = (newTime: Time) => {
        if (onChange) {
            onChange(timeToString(newTime))
        }
    }

    return (
        <div
            style={{
                width: 'fit-content',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start'
            }}
        >
            {label && (
                <span
                    style={{
                        fontSize: "15px",
                        marginLeft: "8px",
                        color: color,
                        fontWeight: "500",
                    }}
                    className="font-medium text-sm ml-2 mb-1">
                    {label}
                </span>
            )}
            <TimeInput
                hourCycle={24}
                value={stringToTime(value)}
                onChange={handleTimeChange}
                startContent={
                    <FaRegClock
                        style={{
                            color: '#55b7fe',
                            fontSize: '22px'
                        }}
                    />
                }
                classNames={{
                    input: ['bg-white'],
                    inputWrapper: ['bg-white !bg-white shadow-none border-0 hover:border-0 focus:border-0 text-black']
                }}
            />
        </div>
    )
}