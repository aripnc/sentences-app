import { api } from "@/lib/axios";

interface SentenceProps {
  id: string;
  description: string;
  translation: string;
  nextReview: Date;
  interval: number;
  repetitions: number;
  fator: number;
}

export type UpdateSentencePropsRequest = {
  data: SentenceProps;
};

export async function updateSentence({ data }: UpdateSentencePropsRequest) {
  try {
    await api.patch("/sentences", data);
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar sentence");
  }
}
