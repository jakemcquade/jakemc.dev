# Stage 1: Base
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat

ENV NEXT_PUBLIC_SITE="https://jakemc.dev"
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=5000

# Stage 2: Build
FROM base AS build
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Stage 3: Runner
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 portfolio --ingroup nodejs
USER portfolio

COPY --from=build --chown=portfolio:nodejs /app/next.config.js .
COPY --from=build --chown=portfolio:nodejs /app/package.json .
COPY --from=build --chown=portfolio:nodejs /app/yarn.lock .

COPY --from=build --chown=portfolio:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=portfolio:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=portfolio:nodejs /app/.next/standalone ./
COPY --from=build --chown=portfolio:nodejs /app/public ./public

ENV NODE_ENV=production
EXPOSE $PORT

ENTRYPOINT ["node", "server.js"]