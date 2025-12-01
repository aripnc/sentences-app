import "reflect-metadata";
import "@/infra/container/container";
import { fastify } from "fastify";
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifyCors } from "@fastify/cors";
// import ScalarApiReference from "@scalar/fastify-api-reference";
import { fastifySwagger } from "@fastify/swagger";
import fastifySocketIO from "fastify-socket.io";
import {
  GenerateSentences,
  CreateSentences,
  FetchSentencesByVocabularyId,
  FetchSentencesToReview,
  UpdateSentence,
} from "@/infra/routes/sentences-routes";
import {
  CreateVocabulary,
  UpdateVocabulary,
  FetchVocabularies,
} from "@/infra/routes/vocabulary-routes";
import { BetterAuthRoute } from "../routes/better-auth-route";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
  maxAge: 86400,
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "sentences generator API",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

// app.register(ScalarApiReference, {
//   routePrefix: "/docs",
// });
app.register(fastifySocketIO, {
  cors: {
    origin: "*",
  },
});

app.register(BetterAuthRoute);

// vocabularies routes
app.register(CreateVocabulary);
app.register(UpdateVocabulary);
app.register(FetchVocabularies);

// sentences routes
app.register(GenerateSentences);
app.register(CreateSentences);
app.register(FetchSentencesByVocabularyId);
app.register(FetchSentencesToReview);
app.register(UpdateSentence);

const start = async () => {
  try {
    await app.listen({
      port: 3333,
      host: "0.0.0.0",
    });

    console.log("🚀 Fastify running at http://localhost:3333");
  } catch (err) {
    console.error("❌ Fastify failed to start:", err);
    process.exit(1);
  }
};

start();
