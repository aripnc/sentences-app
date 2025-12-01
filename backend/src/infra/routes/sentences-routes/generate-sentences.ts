import type { FastifyInstance } from "fastify";
import { buildUserPrompt } from "../prompt";
import Openai from "openai";

const openai = new Openai({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GenerateSentences(app: FastifyInstance) {
  app.ready((error) => {
    if (error) throw error;

    app.io.on("connection", (socket) => {
      console.log("socket connected", socket.id);

      socket.on(
        "sentences.generator",
        async (data: { vocabulary: string; quantidade: string }) => {
          const stream = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: buildUserPrompt(data) }],
            stream: true,
            temperature: 0.4,
          });

          for await (const chunk of stream) {
            const token = chunk.choices?.[0]?.delta?.content;
            console.log(token);
            if (token) socket.emit("sentences", token);
          }

          socket.emit("sentences.done");
        },
      );
    });
  });
}
