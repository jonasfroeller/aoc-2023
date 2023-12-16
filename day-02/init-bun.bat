@echo off

docker pull oven/bun
docker run --rm --init --ulimit memlock=-1:-1 oven/bun
docker run --network host --interactive --tty --rm -v %cd%:/app -w /app oven/bun install
