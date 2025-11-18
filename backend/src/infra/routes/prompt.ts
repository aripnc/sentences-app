export function buildUserPrompt(input: {vocabulary: string, quantidade: string}){
    return [
        `Forme ${input.quantidade} frases em inglês com a palavra ${input.vocabulary}. 
         Cada frase deve seguir o formato:
         Frase: ...
         Tradução: ...`
    ].join("\n")
}