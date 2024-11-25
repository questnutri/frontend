import { IAddress } from '@/models/Address.interface'

export async function fetchCep(cep: string): Promise<any | null> {
    const cleanCep = cep.replace(/\D/g, "")

    if (cleanCep.length !== 8) {
        return null
    }

    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await response.json()

    console.log(data)

    if (data.erro) {
        return null
    }

    return {
        street: data.logradouro,
        hood: data.bairro,
        city: data.localidade,
        state: data.uf,
    }
}
