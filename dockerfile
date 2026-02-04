# Stage 1: Base
FROM oven/bun:1.3.7-alpine AS base
RUN apk add --no-cache libc6-compat

ENV NEXT_PUBLIC_SITE="https://jakemc.dev"
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=5000

# Stage 2: Build
FROM base AS prerelease
WORKDIR /app

COPY package*.json ./
RUN bun install

COPY . .
RUN bun run build

# Stage 3: Runtime
FROM base AS release
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 portfolio --ingroup nodejs
USER portfolio

COPY --from=prerelease --chown=portfolio:nodejs /app/.next/static ./.next/static
COPY --from=prerelease --chown=portfolio:nodejs /app/.next/standalone ./
COPY --from=prerelease --chown=portfolio:nodejs /app/public ./public
COPY --from=prerelease --chown=portfolio:nodejs /app/package.json .
COPY --from=prerelease --chown=portfolio:nodejs /app/next.config.js .

ENV NODE_ENV=production
EXPOSE $PORT
ENTRYPOINT ["bun", "server.js"]