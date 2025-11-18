
export type CreateVocabularyProps = {
  description: string
  type:  "Unknown" | "PhrasalVerb" | "Noun" | "Verb" | "Adjective" | "Adverb"
  userId?: string
}

export type VocabularyProps = {
    id: string;
    description: string;
    type: string;
    difficulty: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string | null;
}

export type UpdateVocabularyProps = {
    id: string
    difficulty:  "EASY" | "MEDIUM" | "HARD";
    type: "Unknown" | "PhrasalVerb" | "Noun" | "Verb" | "Adjective" | "Adverb";    
}

export interface VocabularyControllerInterface{
    createVocabulary(data: CreateVocabularyProps):  Promise<void>
    fetchVocabularies(userId: string): Promise<VocabularyProps[]>
    updateVocabulary(data: UpdateVocabularyProps): Promise<void> 
}