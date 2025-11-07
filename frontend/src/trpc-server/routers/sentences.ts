import { auth } from "@/lib/auth";
import { baseProcedure, router } from "@/trpc-server/init";
import { headers } from "next/headers";
import * as z from "zod/v4";

const sentenceSchema = z.object({
  id: z.string(),
  description: z.string(),
  translation: z.string(),
  nextReview: z.date(),
  interval: z.number(),
  repetitions: z.number(),
  fator: z.float64(),
});

export const sentenceRouter = router({
  createSentences: baseProcedure
    .input(
      z.object({
        vocabularyId: z.string(),
        sentences: z.array(
          z.object({
            frase: z.string(),
            traducao: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const mappedSentences = input.sentences.map((s) => {
        return {
          description: s.frase,
          translation: s.traducao,
          vocabularyId: input.vocabularyId,
        };
      });

      await ctx.prisma.sentence.createMany({
        data: [...mappedSentences],
      });
    }),
  fetchSentencesToReview: baseProcedure.query(async ({ ctx }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const user = session?.user;

    const sentences = await ctx.prisma.sentence.findMany({
      where: {
        nextReview: {
          lte: new Date(),
        },
        AND: {
          vocabulary: {
            userId: user?.id,
          },
        },
      },
    });

    return sentences;
  }),
  fetchSentencesByVocabularyId: baseProcedure
    .input(
      z.object({
        vocabularyId: z.string(),
      }),
    )
    .output(z.array(sentenceSchema))
    .query(async ({ ctx, input }) => {
      const sentences = await ctx.prisma.sentence.findMany({
        where: {
          vocabularyId: input.vocabularyId,
        },
      });

      return sentences;
    }),
  updateSentence: baseProcedure
    .input(sentenceSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.sentence.update({
        where: {
          id: input.id,
        },
        data: input,
      });
    }),
});
