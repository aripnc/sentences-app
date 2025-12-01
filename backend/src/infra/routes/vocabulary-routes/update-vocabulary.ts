import { FastifyInstance } from "fastify";
import { z } from "zod";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { container } from "tsyringe";
import { VocabularyControllerInterface } from "@/domain/interfaces/vocabulary-controller-interface";

export async function UpdateVocabulary(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    "/updateVocabulary",
    {
      schema: {
        querystring: z.object({
          vocabularyId: z.string(),
        }),
        body: z.object({
          difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
          type: z.enum([
            "Unknown",
            "PhrasalVerb",
            "Noun",
            "Verb",
            "Adjective",
            "Adverb",
          ]),
        }),
        response: {
          201: z.string(),
        },
      },
    },
    async (request, reply) => {
      const { vocabularyId } = request.query;
      const { difficulty, type } = request.body;
      const vocabularyController =
        container.resolve<VocabularyControllerInterface>(
          "VocabularyInterfaceController",
        );

      const data = {
        id: vocabularyId,
        difficulty,
        type,
      };

      await vocabularyController.updateVocabulary(data);
    },
  );
}
