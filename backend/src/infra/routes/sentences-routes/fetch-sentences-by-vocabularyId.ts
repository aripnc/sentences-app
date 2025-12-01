import { SentenceControllerInterface } from "@/domain/interfaces/sentence-controller-interface";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { container } from "tsyringe";
import { z } from "zod";

export async function FetchSentencesByVocabularyId(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/sentences",
    {
      schema: {
        querystring: z.object({
          vocabularyId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { vocabularyId } = request.query;
      //chama o controller
      const sentenceController = container.resolve<SentenceControllerInterface>(
        "SentenceControllerInterface",
      );
      const sentences =
        await sentenceController.fetchSentencesByVocabularyId(vocabularyId);

      reply.send({ data: sentences });
    },
  );
}
