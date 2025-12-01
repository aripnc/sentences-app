import { FastifyInstance } from "fastify";
import { auth } from "@/utils/auth";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { container } from "tsyringe";
import { VocabularyControllerInterface } from "@/domain/interfaces/vocabulary-controller-interface";

export async function FetchVocabularies(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get("/vocabularies", async (request, reply) => {
      const session = await auth.api.getSession({
        headers: request.headers,
      });
      const userId = session?.user.id;
      const vocabularyController =
        container.resolve<VocabularyControllerInterface>(
          "VocabularyInterfaceController",
        );

      const data = await vocabularyController.fetchVocabularies(userId!);

      if (data) {
        reply.status(200).send({ data: data });
      }

      reply.status(404).send({ message: "There is no vocabularies!" });
    });
}
