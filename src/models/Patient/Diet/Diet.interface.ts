import { IAliment } from "@/models/Aliment.interface"

export interface IDiet {
    _id: string
    createdAt?: string
    updatedAt?: string
    name: string
    meals: IMeal[]
}

export type DayOfWeek = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'
export interface IMeal {
    _id: string
    createdAt?: string
    updatedAt?: string
    name: string
    hour: string
    daysOfWeek: DayOfWeek[]
    foods?: any[]
}

export interface IFood {
    _id: string
    createdAt?: string
    updatedAt?: string
    aliment?: IAliment | null
    quantity: number | string
    unit: string
    obs?: string
}