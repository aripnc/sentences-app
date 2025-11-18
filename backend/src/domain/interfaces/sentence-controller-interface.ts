export type CreateSentencesProps = {
     description: string,
     translation: string,
     vocabularyId: string,
}

export type SentencesProps = {
  id: string,
  description: string
  translation: string,
  nextReview: Date
  interval: number
  repetitions: number
  fator: number,
}


export interface SentenceControllerInterface{
    createSentences(data: CreateSentencesProps[]): Promise<void>
    fetchSentencesToReview(userId: string): Promise<SentencesProps[]>
    fetchSentencesByVocabularyId(vocabularyId: string): Promise<SentencesProps[]> 
    updateSentence(data: SentencesProps): Promise<void>
}