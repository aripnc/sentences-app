import { api } from "@/lib/axios";
import { VocabularyProps } from "@/@types/vocabulary";

interface FetchVocabularyResponse{ 
  data: VocabularyProps[]
}

export async function fetchVocabularies(){
    try {
        const {data} = await api.get<FetchVocabularyResponse>('/vocabularies')
        return data.data
    } catch (error) {
        console.error(error)
        throw new Error('Erro ao buscar vocabularios')
    }        
}