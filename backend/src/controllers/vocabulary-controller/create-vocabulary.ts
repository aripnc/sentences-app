import {prisma} from '@/utils/prisma'


type CreateVocabularyProps ={
  description: string
  type:  "Unknown" | "PhrasalVerb" | "Noun" | "Verb" | "Adjective" | "Adverb"
  userId?: string
} 

export async function createVocabulary(data: CreateVocabularyProps){
   await prisma.vocabulary.create({
       data
   })         
}