import { api } from "@/lib/axios";

interface SentencesProps {
  id: string;
  description: string;
  translation: string;
  nextReview: Date;
  interval: number;
  repetitions: number;
  fator: number;
}

export type FetchSentencesToReviewResponse = {
  data: SentencesProps[];
};

export async function fetchSentencesToReview() {
  try {
    const { data } =
      await api.get<FetchSentencesToReviewResponse>("/sentencesToReview");
    return data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar sentences");
  }
}
