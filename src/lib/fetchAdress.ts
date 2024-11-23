import { Address } from "@/models/Address.interface";

export async function fetchCep(cep: string): Promise<Address | null> {
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
        return null;
    }

    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await response.json()

    if (data.erro) {
        return null;
    }

    return {
        cep: data.cep,
        street: data.street,
        hood: data.hood,
        city: data.city,
        state: data.state,
    };
}
