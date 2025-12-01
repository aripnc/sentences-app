import { SentenceControllerInterface } from "@/domain/interfaces/sentence-controller-interface";
import { auth } from "@/utils/auth";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { container } from "tsyringe";

export async function FetchSentencesToReview(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get("/sentencesToReview", async (request, reply) => {
      const session = await auth.api.getSession({
        headers: request.headers,
      });
      const userId = session?.user.id;
      //chama o controller
      const sentenceController = container.resolve<SentenceControllerInterface>(
        "SentenceControllerInterface",
      );
      const sentences = await sentenceController.fetchSentencesToReview(
        userId!,
      );
      reply.send({ data: sentences });
    });
}
