import {
  CreateSentencesProps,
  SentenceControllerInterface,
  SentencesProps,
} from "@/domain/interfaces/sentence-controller-interface";
import { injectable } from "tsyringe";
import { prisma } from "@/utils/prisma";

@injectable()
export class SentenceController implements SentenceControllerInterface {
  async createSentences(data: CreateSentencesProps[]): Promise<void> {
    await prisma.sentence.createMany({
      data: [...data],
    });
  }

  async fetchSentencesToReview(userId: string): Promise<SentencesProps[]> {
    const sentences = await prisma.sentence.findMany({
      where: {
        nextReview: {
          lte: new Date(),
        },
        AND: {
          vocabulary: {
            userId,
          },
        },
      },
    });

    return sentences;
  }

  async fetchSentencesByVocabularyId(
    vocabularyId: string,
  ): Promise<SentencesProps[]> {
    const sentences = await prisma.sentence.findMany({
      where: {
        vocabularyId,
      },
    });

    return sentences;
  }

  async updateSentence(data: SentencesProps): Promise<void> {
    await prisma.sentence.update({
      where: {
        id: data.id,
      },
      data,
    });
  }
}
