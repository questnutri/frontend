export type DayOfWeek = 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY'

export interface Aliment {
    _id: string
    name: string
    group: string
    kcal: string
    carb: string
    protein: string
    fat: string
}

export interface Food {
    _id: string
    aliment?: Aliment | null | any
    quantity: number | any
    unit: 'g' | any
    observation?: string
}

export interface Meal {
    _id?: string
    name: string | any
    hour: string | any
    daysOfWeek: DayOfWeek[] | any
    foods: Food[] | any
}

export interface Diet {
    _id: string
    name: string
    meals: Meal[]
}