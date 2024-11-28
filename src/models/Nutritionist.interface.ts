export interface INutritionist extends Document {
	firstName: string,
	lastName?: string
	email: string,
	password: string,
	patients: any[]
	details?: {
		rg?: string
		cpf?: string
		phone?: string
		birth?: Date,
		gender?: 'male' | 'female' | 'other',
		cnpj?: string,
		clinicName?: string,
		crn?: string,
		dateOfIssue?: Date
	}
}
