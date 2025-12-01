# ---------- DEPENDENCIES STAGE ----------
FROM node:20-alpine AS dependencies
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./ 
RUN corepack enable pnpm && pnpm install


# ---------- BUILD STAGE ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm build

# ---------- RUNTIME STAGE ----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js", "-H", "0.0.0.0"]