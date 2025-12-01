import { api } from "@/lib/axios";

interface CreateVocabularyRequest {
  description: string;
  type: string;
}

type VocabularyProps = {
  id: string;
  description: string;
  type: string;
  difficulty: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
};

interface CreateVocabularyResponse {
  data: VocabularyProps;
}

export async function createVocabulary(data: CreateVocabularyRequest) {
  try {
    const response = await api.post<CreateVocabularyResponse>(
      "/vocabularies",
      data,
    );

    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar vocabulario");
  }
}
