"use client";

import type { VocabularyProps } from "@/@types/vocabulary";
import EditForm from "../edit-form";
import { SentencesComponent } from "../sentences";

type RowActionsProps = {
  vocabulary: VocabularyProps;
};

export default function RowActions({ vocabulary }: RowActionsProps) {
  return (
    <div className="flex gap-1">
      <SentencesComponent vocabulary={vocabulary} />
      <EditForm vocabulary={vocabulary} />
    </div>
  );
}
