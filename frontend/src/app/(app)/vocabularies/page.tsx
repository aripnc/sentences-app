"use client";
import { socket } from "@/client-socket";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { classificacaoSchema } from "@/contracts";
import { classificacaoHelper, sentencesQuantity } from "@/helpers";
import { toast } from "@/hooks/use-toast";
import { createSentences } from "@/routes/sentences/create-sentences";
import { createVocabulary } from "@/routes/vocabularies";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { BrushCleaning, IterationCcwIcon, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Sentences from "./components/sentences";

const formSchema = z.object({
  vocabulary: z.string().nonempty({ message: "Insira um vocabulário" }),
  tipo: classificacaoSchema,
  quantidade: z.string().nonempty({
    message: "Selecione uma quantidade de frases a serem geradas",
  }),
});

export default function Vocabularies() {
  const [text, setText] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vocabulary: "",
      tipo: "Unknown",
      quantidade: "",
    },
  });

  useEffect(() => {
    socket.off("sentences");
    socket.on("sentences", (data: string) => {
      setText((prev) => prev + data);
      // console.log(data);
    });

    socket.on("sentences.done", () => {
      setIsGenerating(false);
    });

    return () => {
      socket.off("sentences");
      socket.off("sentences.done");
    };
  }, []);

  const frases = text
    .split(/Frase:/)
    .filter(Boolean)
    .map((block) => {
      const [frase, traducao] = block.split("Tradução:");
      return {
        frase: frase?.replace(/\n/g, "").trim(),
        traducao: traducao?.replace(/\n/g, "").trim(),
      };
    });

  const handleGenerateSentences = async (data: z.infer<typeof formSchema>) => {
    const { vocabulary, quantidade } = data;
    setIsGenerating(true);
    socket.emit("sentences.generator", { quantidade, vocabulary });
  };

  const handleSaveVocabularyAndSentences = async (
    formData: z.infer<typeof formSchema>,
  ) => {
    const { vocabulary, tipo } = formData;

    const data = await createVocabulary({
      description: vocabulary,
      type: tipo,
    });
    console.log(data);

    if (data && frases) {
      await createSentences({
        vocabularyId: data.id,
        sentences: frases,
      });
      toast({
        title: "Vocabulario e frases salvas",
        variant: "success",
      });
    }

    handleClear();
  };

  const handleClear = async () => {
    form.reset();
    setText("");
  };

  return (
    <>
      <div className="w-[1200px] border rounded-sm self-center py-10 px-4">
        <Form {...form}>
          <div>
            <form
              onSubmit={form.handleSubmit(handleGenerateSentences)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="vocabulary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Vocabulário</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Insira aqui sua palavra em inglês"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tipo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Tipo</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {classificacaoHelper.map((v, i) => (
                          <SelectItem key={i} value={v.value}>
                            {v.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Quantidade</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma quantidade de frases a gerar" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sentencesQuantity.map((s, i) => (
                          <SelectItem key={i} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-x-4 w-full">
                <Button className="text-base" size="lg" type="submit">
                  {isGenerating ? (
                    <div className="flex items-center">
                      <Loader className="animate-spin" size={16} />
                      Gerando frases
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <IterationCcwIcon size={16} />
                      Gerar frases
                    </div>
                  )}
                </Button>
                <Button size="lg" variant="outline" onClick={handleClear}>
                  <BrushCleaning size={16} />
                  Clear
                </Button>
              </div>
            </form>
          </div>
        </Form>
      <div className="mt-10 w-full self-center pb-6">
        <div className="space-y-5">
          <Sentences frases={frases ?? []} />
          <Button
            className="w-full text-base"
            variant="success"
            onClick={form.handleSubmit(handleSaveVocabularyAndSentences)}
            disabled={frases.length < 0}
          >
            Salvar
          </Button>
        </div>

      </div>
      </div>
    </>
  );
}
