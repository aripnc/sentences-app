import { api } from "@/lib/axios";

interface UpdateVocabularyRequest{
   vocabularyId: string
   difficulty: string,   
   type: string 
}

export async function updateVocabulary(data: UpdateVocabularyRequest){
    try {
        await api.post<UpdateVocabularyRequest>(`/vocabularies/${data.vocabularyId}`,data)
        
    } catch (error) {
        console.error(error)
        throw new Error('Erro ao criar vocabulario')
    }        
}