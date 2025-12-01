import { SentenceControllerInterface } from "@/domain/interfaces/sentence-controller-interface";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { container } from "tsyringe";
import { z } from "zod";

const sentenceSchema = z.object({
  id: z.string(),
  description: z.string(),
  translation: z.string(),
  nextReview: z.coerce.date(),
  interval: z.number(),
  repetitions: z.number(),
  fator: z.float64(),
});

export async function UpdateSentence(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    "/sentences",
    {
      schema: {
        body: sentenceSchema,
      },
    },
    async (request, reply) => {
      const data = request.body;
      //chama o controller
      const sentenceController = container.resolve<SentenceControllerInterface>(
        "SentenceControllerInterface",
      );
      const sentences = await sentenceController.updateSentence(data);
      reply.send({ data: sentences });
    },
  );
}
