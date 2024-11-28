import { IDiet, IFood, IMeal } from "@/models/Patient/Diet/Diet.interface"
import { fetchWithAuth } from "../fetchWithAuth"

export const createPatientDiet = async (idPatient: string, data: Partial<IDiet>) => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/nutritionist/patient/${idPatient}/diet/`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        return {
            status: response.status,
            data: await response.json(),
        }
    } catch (error) {
        return {
            status: 500,
            data: {
                message: 'Application error'
            },
        }
    }
}

export const createPatientMeal = async (idPatient: string, idDiet: string, data: Partial<IMeal>) => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/nutritionist/patient/${idPatient}/diet/${idDiet}/meal/`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        return {
            status: response.status,
            data: await response.json(),
        }
    } catch (error) {
        return {
            status: 500,
            data: {
                message: 'Application error'
            },
        }
    }
}

export const deletePatientMeal = async (idPatient: string, idDiet: string, idMeal: string) => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/nutritionist/patient/${idPatient}/diet/${idDiet}/meal/${idMeal}`, {
            method: 'DELETE',
        })
        return {
            status: response.status,
            data: await response.json(),
        }
    } catch (error) {
        return {
            status: 500,
            data: {
                message: 'Application error'
            },
        }
    }
}

export const createFood = async (idPatient: string, idDiet: string, idMeal: string, data: Partial<IFood>) => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/nutritionist/patient/${idPatient}/diet/${idDiet}/meal/${idMeal}/food`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        return {
            status: response.status,
            data: await response.json(),
        }
    } catch (error) {
        return {
            status: 500,
            data: {
                message: 'Application error'
            },
        }
    }
}

export const deleteFood = async (idPatient: string, idDiet: string, idMeal: string, idFood: string) => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/nutritionist/patient/${idPatient}/diet/${idDiet}/meal/${idMeal}/food/${idFood}`, {
            method: 'DELETE',
        })
        return {
            status: response.status,
            data: await response.json(),
        }
    } catch (error) {
        return {
            status: 500,
            data: {
                message: 'Application error'
            },
        }
    }
}