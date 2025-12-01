import type { SentenceProps } from "@/@types/vocabulary";
import { api } from "@/lib/axios";

interface FetchSentencesByVocabularyIdRequest {
  vocabularyId: string;
}

interface FetchSentencesByVocabularyIdResponse {
  data: SentenceProps[];
}

export async function fetchSentencesByVocabularyId({
  vocabularyId,
}: FetchSentencesByVocabularyIdRequest) {
  const searchParams = new URLSearchParams();
  searchParams.set("vocabularyId", vocabularyId);

  try {
    const { data } = await api.get<FetchSentencesByVocabularyIdResponse>(
      `/sentences?${searchParams.toString()}`,
    );
    return data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar sentences");
  }
}
