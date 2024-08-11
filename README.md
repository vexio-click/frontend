Instructions:
create file .env in same directory as .env.example
create file .env.development in same directory as .env.development.example
create file .env.production in same directory as .env.production.example

copy file .env.example content into .env
copy file .env.development.example content into .env.development
copy file .env.production.example content into .env.production

bun i
(bun run dev) - optional, to make it work with backend request start backend
(bun run dev on backend)

bun run release