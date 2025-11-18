import { SentenceControllerInterface } from "@/domain/interfaces/sentence-controller-interface";
import { FastifyInstance } from "fastify";
import {ZodTypeProvider} from 'fastify-type-provider-zod'
import { container } from "tsyringe";
import {z} from 'zod'

export async function FetchSentencesByVocabularyId(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().route({
         method: 'GET',
         url: '/sentences',
         schema: {
           body: z.object({
             vocabularyId: z.string(),
           }),
          },
          handler: async (req, res) => {
              const {vocabularyId} = req.body
              //chama o controller
              const sentenceController = container.resolve<SentenceControllerInterface>('SentenceControllerInterface')
              const sentences = await sentenceController.fetchSentencesByVocabularyId(vocabularyId)

               res.send({data: sentences})
          }
     
    })
}