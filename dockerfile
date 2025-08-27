# Stage 1: Base
FROM oven/bun:1-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=5000

# Stage 2: Install
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Stage 3: Prerelease
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production
# RUN bun test
RUN bun run build

# Final Stage: Release
FROM base AS release

COPY --from=install /temp/prod/node_modules ./node_modules
COPY --from=prerelease /app/.next/static ./.next/static
COPY --from=prerelease /app/.next/standalone ./
COPY --from=prerelease /app/next.config.js .
COPY --from=prerelease /app/public ./public
COPY --from=prerelease /app/package.json .

EXPOSE $PORT/tcp
ENTRYPOINT ["node", "server.js"]