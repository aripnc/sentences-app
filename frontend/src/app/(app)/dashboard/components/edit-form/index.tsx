"use client";
import type { VocabularyProps } from "@/@types/vocabulary";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { classificacaoSchema, dificultySchema } from "@/contracts";
import { classificacaoHelper, dificultyHelper } from "@/helpers";
import { toast } from "@/hooks/use-toast";
import { updateVocabulary } from "@/routes/vocabularies";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit2Icon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type EditFormProps = {
  vocabulary: VocabularyProps;
};

const difficultyEnum = dificultySchema;
const typeEnum = classificacaoSchema;

const formSchema = z.object({
  difficulty: difficultyEnum,
  type: typeEnum,
});

export default function EditForm({ vocabulary }: EditFormProps) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      difficulty: vocabulary.difficulty,
      type: vocabulary.type,
    },
  });

  const { watch } = form;
  const difficulty = watch("difficulty");
  const type = watch("type");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { difficulty, type } = values;

    await updateVocabulary({ vocabularyId: vocabulary.id, difficulty, type }),
      queryClient.invalidateQueries({ queryKey: ["vocabulary"] });

    setIsOpen(false);
  }

  const isBtnAtualizarDisabled = !difficulty && !type;

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <Button variant="ghost" size="icon">
            <Edit2Icon size={16} className="text-emerald-600" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:min-w-[700px]">
          <DialogHeader>
            <DialogTitle>Tem certeza?</DialogTitle>
            <DialogDescription>
              Isso irá atualizar o contexto do deu vocabulário.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Dificuldade</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a dificuldade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {dificultyHelper.map((d, i) => (
                          <SelectItem key={i} value={d.value}>
                            {d.name}
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Tipo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
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

              <Button
                variant="default"
                className="w-full"
                type="submit"
                disabled={isBtnAtualizarDisabled}
              >
                Atualizar
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
