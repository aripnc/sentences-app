import { FastifyInstance } from "fastify";
import { createVocabulary } from "@/controllers/vocabulary-controller/create-vocabulary";
import { auth } from "@/utils/auth";
import { z} from 'zod'
import type { ZodTypeProvider } from 'fastify-type-provider-zod';


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
            createVocabulary(data) 
        }
     })  
    

}  