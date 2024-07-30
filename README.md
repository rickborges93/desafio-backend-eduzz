# Eduzz Technical Test
 Technical test for mid level backend developer for the company Eduzz.

## Technologies
- Fastify
- Typescript
- zod
- ESLint
- DotEnv

## Methologies
- SOLID
- TDD
- Factory

---
## How to make the project ready

1. Clone this repository.

```
git clone https://github.com/rickborges93/desafio-backend-eduzz.git
```

2. Access the project folder.

```
cd desafio-backend-eduzz
```

3. Install the dependances.
```
  npm install
```


## How to install the docker dependance

After project ready, in the root folder at the project just run the code below.

```
  docker-compose up -d
```

In your Docker you'll see a new container that were created for this project. This container contains the PostgreSQL Database that we are using as the main database.

## How to run the project

1. Run all the migrations.

```
  npx prisma migrate deploy
```

2. Now, we need to run the project.

```
  npm run dev
```

Enjoy it :)