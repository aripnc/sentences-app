import { FastifyInstance } from "fastify";
import { VocabularyControllerInterface } from "@/domain/interfaces/vocabulary-controller-interface";
import { auth } from "@/utils/auth";
import {z} from 'zod'
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import {container} from 'tsyringe'


export async function CreateVocabulary(app: FastifyInstance){
     app.withTypeProvider<ZodTypeProvider>().route({
        method: 'POST',
        url: '/vocabularies',
        schema: {
            body: z.object({
                description: z.string(),
                type: z.enum(["Unknown","PhrasalVerb","Noun","Verb","Adjective","Adverb"])
            }),
            response:{
                201: z.string()
            }
        },
        handler: async (req, res) => {
            const session = await auth.api.getSession({
                headers: req.headers
            })
            const {description, type} = req.body
            const data = {
                description, 
                type,
                userId: session?.user.id
            }
            const vocabularyController = container.resolve<VocabularyControllerInterface>('VocabularyInterfaceController')
            
            await vocabularyController.createVocabulary(data) 
        }
     })  
    

}  