import "reflect-metadata";
import { fastifyCors } from '@fastify/cors';
import { fastifySwagger } from '@fastify/swagger';
import ScalarApiReference from '@scalar/fastify-api-reference';
import { fastify } from 'fastify';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { BetterAuthRoute } from '@/infra/routes/better-auth-route';
import { GenerateSentences, CreateSentences, FetchSentencesByVocabularyId, FetchSentencesToReview,UpdateSentence } from '@/infra/routes/sentences-routes';
import fastifySocketIO from 'fastify-socket.io';
import { CreateVocabulary,UpdateVocabulary, FetchVocabularies } from "@/infra/routes/vocabulary-routes";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  maxAge: 86400,
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'sentences generator API',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
});

app.register(ScalarApiReference, {
  routePrefix: '/docs',
});

app.register(fastifySocketIO, {
  cors: {
    origin: "*"
  }
})


app.register(BetterAuthRoute);

// vocabularies routes
app.register(CreateVocabulary)
app.register(UpdateVocabulary)
app.register(FetchVocabularies)

// sentences routes
app.register(GenerateSentences);
app.register(CreateSentences)
app.register(FetchSentencesByVocabularyId)
app.register(FetchSentencesToReview)
app.register(UpdateSentence)


app.listen({ port: 3333, host: '0.0.0.0' }, () => {
  console.log('server running on http://localhost:3333 🚀');
  console.log('Docs available at http://localhost:3333/docs 📚');
});
