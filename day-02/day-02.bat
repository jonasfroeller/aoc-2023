@echo off

docker run --network host --interactive --tty --rm -v %cd%:/app -w /app oven/bun run day-02.ts
