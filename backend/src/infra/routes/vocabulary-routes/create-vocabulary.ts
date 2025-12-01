import { FastifyInstance } from "fastify";
import { VocabularyControllerInterface } from "@/domain/interfaces/vocabulary-controller-interface";
import { auth } from "@/utils/auth";
import { z } from "zod";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { container } from "tsyringe";

export async function CreateVocabulary(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/vocabularies",
    {
      schema: {
        body: z.object({
          description: z.string(),
          type: z.enum([
            "Unknown",
            "PhrasalVerb",
            "Noun",
            "Verb",
            "Adjective",
            "Adverb",
          ]),
        }),
      },
    },
    async (request, reply) => {
      try {
        const session = await auth.api.getSession({
          headers: request.headers,
        });

        console.log("session:", session);

        const { description, type } = request.body;

        const data = {
          description,
          type,
          userId: session?.user.id,
        };

        console.log("payload:", data);

        const vocabularyController =
          container.resolve<VocabularyControllerInterface>(
            "VocabularyInterfaceController",
          );

        const vocabulary = await vocabularyController.createVocabulary(data);

        return reply.send({ data: vocabulary });
      } catch (error: any) {
        console.error("🔥 Erro ao criar vocabulary:", error);

        return reply.status(500).send({
          error: "Internal Server Error",
          message: error?.message,
        });
      }
    },
  );
}
