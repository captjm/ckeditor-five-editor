SHELL := /bin/bash

up:
	docker compose up --build -d

ps:
	docker compose ps

logs:
	docker compose logs -f

stop:
	docker compose down -v

restart:
	docker compose down && docker compose up --build

sh:
	docker compose run --rm ckeditor-dev sh

add-file-paths:
	docker compose run --rm ckeditor-dev npm run add:file-paths

build:
	docker compose run --rm ckeditor-dev npm run build

serve:
	docker compose up ckeditor-serve

serve-logs:
	docker compose logs -f ckeditor-serve

build-and-serve:
	docker compose run --rm ckeditor-dev npm run build
	docker compose up ckeditor-serve

licenses:
    docker compose run --rm ckeditor-dev yarn generate:licenses