import { IWeight } from "./Weight/Weight.interface"

export interface IPatient {
	_id: string
	firstName: string
	lastName?: string
	email: string
	password: string
	details?: {
		rg?: string
		cpf?: string
		birth?: Date
		height?: number
		gender?: 'male' | 'female' | 'other'
		weights?: IWeight[]
		lastWeight?: string
		routine?: string
		goals?: string
		foodPreferences?: string
		healthState?: {
			diabetic?: boolean
			pregnancy?: {
				isPregnant: boolean
				dueDate?: Date
				trimester?: 1 | 2 | 3
				pregnancyType?: 'single' | 'multiple'
				complications?: string
				obs?: string
			}
			allergies?: {
				name: string
				severity: 'mild' | 'moderate' | 'severe'
				obs?: string
			}[]
			chronicDiseases?: {
				name: string
				diagnosedAt?: Date
				treatment?: string
			}[]
			currentMedications?: {
				name: string
				dosage?: string
				frequency?: string
			}[]
			obs?: string
		}
	}
	nutri: string
	activeDiet?: string
	diets?: any[]
	dailyMealRecord?: any[]
	createdAt?: any
	updatedAt?: any
}