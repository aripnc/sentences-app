import { SentenceControllerInterface } from "@/domain/interfaces/sentence-controller-interface";
import { auth } from "@/utils/auth";
import { FastifyInstance } from "fastify";
import {ZodTypeProvider} from 'fastify-type-provider-zod'
import { container } from "tsyringe";

export async function FetchSentencesToReview(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().route({
         method: 'GET',
         url: '/sentencesToReview',
          handler: async (req, res) => {
                 const session = await auth.api.getSession({
                      headers: req.headers
                  })
                  const userId = session?.user.id 
                  //chama o controller
                  const sentenceController = container.resolve<SentenceControllerInterface>('SentenceControllerInterface')
                  const sentences = await sentenceController.fetchSentencesToReview(userId!)
                  res.send({data: sentences})
          }
     
    })
}