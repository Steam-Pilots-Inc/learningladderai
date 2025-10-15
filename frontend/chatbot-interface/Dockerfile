FROM node:20-alpine

WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

COPY package.json pnpm-workspace.yaml ./
COPY frontend/chatbot-interface/package.json frontend/chatbot-interface/package.json
RUN pnpm install

COPY frontend ./frontend
WORKDIR /app/frontend/chatbot-interface

EXPOSE 3000
CMD ["pnpm", "dev", "--host", "0.0.0.0", "--port", "3000"]