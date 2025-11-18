import { VocabularyControllerInterface, 
        CreateVocabularyProps, 
       VocabularyProps, 
       UpdateVocabularyProps } from "@/domain/interfaces/vocabulary-controller-interface";
import {prisma} from '@/utils/prisma'
import {injectable} from 'tsyringe'


@injectable()
export class VocabularyController implements VocabularyControllerInterface{
    
    async createVocabulary(data: CreateVocabularyProps): Promise<void> {
          await prisma.vocabulary.create({
             data
          })  
    }

    async fetchVocabularies(userId: string): Promise<VocabularyProps[]> {
          const vocabularies = await prisma.vocabulary.findMany({
              where: {
                  userId
              },
              orderBy: {
                createdAt: 'desc'
              }
          })
                   
          return vocabularies
    }

    async updateVocabulary(data: UpdateVocabularyProps): Promise<void> {
          const vocabulary = await prisma.vocabulary.findUnique({
            where: {
             id: data.id,
           },
         });
        await prisma.vocabulary.update({
            where: {
                id: data.id
            },
            data: {
                 difficulty: data.difficulty ? data.difficulty : vocabulary?.difficulty, 
                 type: data.type ? data.type : vocabulary?.type,
                 updatedAt: new Date()
            }
        })     
    }
    
}