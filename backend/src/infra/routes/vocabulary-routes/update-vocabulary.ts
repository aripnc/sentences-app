import { FastifyInstance } from "fastify";
import { z} from 'zod'
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { container } from "tsyringe";
import { VocabularyControllerInterface } from "@/domain/interfaces/vocabulary-controller-interface";


export async function UpdateVocabulary(app: FastifyInstance){
     app.withTypeProvider<ZodTypeProvider>().route({
        method: 'POST',
        url: '/vocabularies',
        schema: {
            params: z.object({
               vocabularyId: z.string() 
            }),
            body: z.object({
                 difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),   
                 type: z.enum(["Unknown", "PhrasalVerb", "Noun", "Verb", "Adjective", "Adverb" ])
            }),
            response:{
                201: z.string()
            }
        },
        handler: async (req, res) => {
            const {vocabularyId} = req.params
            const {difficulty, type} = req.body
            const vocabularyController = container.resolve<VocabularyControllerInterface>('VocabularyInterfaceController')
            
            const data = {
               id: vocabularyId,
               difficulty,
               type  
            } 
            
            await vocabularyController.updateVocabulary(data)       
         
        }
     })  
    

}  