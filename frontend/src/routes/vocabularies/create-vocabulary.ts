import { api } from "@/lib/axios";

interface CreateVocabularyRequest{
    description: string,
    type: string    
}

export async function createVocabulary(data: CreateVocabularyRequest){
    try {
        await api.post<CreateVocabularyRequest>('/vocabularies', data)
        
    } catch (error) {
        console.error(error)
        throw new Error('Erro ao criar vocabulario')
    }        
}