import { fetchWithAuth } from "./fetchWithAuth"
import { IAliment } from "@/models/Aliment.interface"
import { PaginatedResult } from "@/utils/interfaces/PaginatedResult.interface"

export const fetchAliments = async (
  page: number = 1,
  size: number = 10,
  name: string = ''
): Promise<PaginatedResult<IAliment>> => {
  try {
    const params = new URLSearchParams({
      page: String(page),
      size: String(size),
    })
    if (name) {
      params.append('name', name)
    }

    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/aliments/taco?${params.toString()}`,
      { method: 'GET' }
    )

    if (!response.ok) {
      throw new Error('Erro ao buscar alimentos')
    }

    const data = await response.json()
    return data
  } catch (error) {
    return {
      content: [],
      totalItems: 0,
      currentPage: page,
      pageSize: size,
      totalPages: 0,
      isFirstPage: true,
      isLastPage: true
    }
  }
}



export const fetchOneAliment = async (id: string): Promise<any> => {
    console.log(id)
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/aliment/taco/${id}`, {
            method: 'GET',
        })

        if (response.status !== 200) {
            throw new Error('Could not fetch aliment data')
        }

        return {
            status: response.status,
            data: await response.json()
        }

    } catch (error) {
        console.error(error)
        throw new Error('Could not fetch aliment')
    }
}