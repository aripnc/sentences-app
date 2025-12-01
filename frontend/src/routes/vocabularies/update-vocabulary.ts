import { api } from "@/lib/axios";

interface UpdateVocabularyRequest {
  vocabularyId: string;
  difficulty: string;
  type: string;
}

export async function updateVocabulary(data: UpdateVocabularyRequest) {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set("vocabularyId", data.vocabularyId);

    await api.patch<UpdateVocabularyRequest>(
      `/updateVocabulary?${searchParams.toString()}`,
      data,
    );
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar vocabulario");
  }
}
