import "reflect-metadata";
import { container } from "tsyringe";
import { VocabularyControllerInterface } from "@/domain/interfaces/vocabulary-controller-interface";
import { VocabularyController } from "@/infra/controllers/vocabulary-controller";
import { SentenceControllerInterface } from "@/domain/interfaces/sentence-controller-interface";
import { SentenceController } from "@/infra/controllers/sentence-controller";

container.register<VocabularyControllerInterface>(
  "VocabularyInterfaceController",
  VocabularyController,
);
container.register<SentenceControllerInterface>(
  "SentenceControllerInterface",
  SentenceController,
);
