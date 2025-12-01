import type { VocabularyProps } from "@/@types/vocabulary";
import { api } from "@/lib/axios";

interface FetchVocabularyResponse {
  data: VocabularyProps[];
}

export async function fetchVocabularies() {
  try {
    const { data } = await api.get<FetchVocabularyResponse>("/vocabularies");
    return data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar vocabularios");
  }
}
