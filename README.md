# Eduzz Technical Test
 Technical test for mid level backend developer for the company Eduzz.

---

## Software Engeneering

### Functional Requirements (RFs)
- [ ] It should be possible to register
- [ ] It should be possible to authenticate
- [ ] It should be possible to deposit money (reais) at the platform
- [ ] It should be possible to check the available balance in reais in the costumer's account
- [ ] It should be possible to see the current bitcoin price, purchase and sale
- [ ] It should be possible to buy bitcoin using the available balance in the costumer's account
- [ ] It should be possible to see all the customer's transactions 
- [ ] It should be possible to sell BTC
- [ ] It should be possible to list the deposits, purchases and withdrawals (last 90 days)
- [ ] It should be possible to see the total of bought and sold BTC at the current day
- [ ] It should be possible to see the history of the bought/sold value of BTC grouping by 10 minutes about last 24 hours

### Business Rules (RNs)
- [ ] Send an e-mail with the value of money deposited at the platform 
- [ ] When buy bitcoin we calculate the conversion of the value in reais ate the selling price 
- [ ] When buy bitcoin an e-mail must be sent with the amount invested in R$ and amount BTC purchased
- [ ] Costumer Transaction: Purchase date, amount invested, value of BTC at the time of purchase, percentage change in the price of Bitcoin and current gross value of the investment.
- [ ] At the sales time, an e-mail must be sent with the value sold in BTC and the value redeemed in R$

### Non-functional Requirements (RNFs)
- [x] The programming language must be Node.js with TypeScript
- [ ] The costumer's password must be cryptographed
- [x] The database must be MariaDB, Postgres or MongoDB
- [ ] The costumer must be identified by a JWT (JSON Web Token)

---

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