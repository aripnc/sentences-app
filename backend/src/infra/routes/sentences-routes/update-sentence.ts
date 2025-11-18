import { SentenceControllerInterface } from "@/domain/interfaces/sentence-controller-interface";
import { FastifyInstance } from "fastify";
import {ZodTypeProvider} from 'fastify-type-provider-zod'
import { container } from "tsyringe";
import {z} from 'zod'

const sentenceSchema = z.object({
  id: z.string(),
  description: z.string(),
  translation: z.string(),
  nextReview: z.date(),
  interval: z.number(),
  repetitions: z.number(),
  fator: z.float64(),
});

export async function UpdateSentence(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().route({
         method: 'PATCH',
         url: '/sentences',
         schema: {
           body: sentenceSchema,
          },
          handler: async (req, res) => {
              const data = req.body
              //chama o controller
              const sentenceController = container.resolve<SentenceControllerInterface>('SentenceControllerInterface')
              const sentences = await sentenceController.updateSentence(data) 
              res.send({data: sentences})
          }
     
    })
}