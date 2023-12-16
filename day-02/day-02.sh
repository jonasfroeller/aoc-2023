#!/bin/bash

docker run --network host --interactive --tty --rm -v $(pwd):/app -w /app oven/bun run day-02.ts
