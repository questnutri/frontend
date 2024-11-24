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