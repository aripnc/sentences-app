import { FastifyInstance } from "fastify";
import {ZodTypeProvider} from 'fastify-type-provider-zod'
import {z} from 'zod'
import {container} from 'tsyringe'
import { SentenceControllerInterface } from "@/domain/interfaces/sentence-controller-interface";

export async function CreateSentences(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().route({
         method: 'POST',
         url: '/sentences',
         schema: {
           body: z.object({
             vocabularyId: z.string(),
             sentences: z.array(
                z.object({ 
                 frase: z.string(),
                 traducao: z.string()
              }))
           }),
            response: {
             201: z.string()
            }
          },
          handler: async (req, res) => {
              const {vocabularyId, sentences} = req.body
                const mappedSentences = sentences.map((s) => {
                        return {
                          description: s.frase,
                          translation: s.traducao,
                          vocabularyId: vocabularyId,
                        };
                   });

              //chama o controller
              const sentenceController = container.resolve<SentenceControllerInterface>('SentenceControllerInterface')
              await sentenceController.createSentences(mappedSentences)     
                               
          }
     
    })
}