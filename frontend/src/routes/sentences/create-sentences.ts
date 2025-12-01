import { api } from "@/lib/axios";

interface CreateSentencesRequest {
  vocabularyId: string;
  sentences: Array<{ frase: string; traducao: string }>;
}

export async function createSentences(data: CreateSentencesRequest) {
  try {
    await api.post<CreateSentencesRequest>("/sentences", data);
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar sentences");
  }
}
