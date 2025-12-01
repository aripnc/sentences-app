# ---------- DEPENDENCIES STAGE ----------
FROM node:20-alpine AS dependencies
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./ 
RUN corepack enable pnpm && pnpm install


# ---------- BUILD STAGE ----------
FROM node:20-alpine AS build
WORKDIR /app/build
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm build

# ---------- RUNTIME STAGE ----------
FROM node:20-alpine AS runner
WORKDIR /app

COPY package.json pnpm-lock.yaml* prisma ./
RUN corepack enable pnpm && pnpm install
RUN npx prisma generate

COPY --from=build /app/build/dist/infra/http/server.js ./server.js

EXPOSE 3333
ENV PORT 3333

CMD ["node", "server.js"]