import { FastifyInstance } from "fastify";
import { auth } from "@/utils/auth";
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { container } from "tsyringe";
import { VocabularyControllerInterface } from "@/domain/interfaces/vocabulary-controller-interface";


export async function FetchVocabularies(app: FastifyInstance){
     app.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/vocabularies',
        handler: async (req, res) => {
            const session = await auth.api.getSession({
                headers: req.headers
            })
            const userId = session?.user.id 
            const vocabularyController = container.resolve<VocabularyControllerInterface>('VocabularyInterfaceController')
                        
            const data =  await vocabularyController.fetchVocabularies(userId!) 
        
            if(data){
                res.code(201).send({data: data})
            }

            res.code(404).send({message: 'There is no vocabularies!'})
        }
     })  
    
}  