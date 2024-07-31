-- CreateEnum
CREATE TYPE "TypeBilling" AS ENUM ('deposit', 'withdraw');

-- CreateEnum
CREATE TYPE "TypeBtcTransaction" AS ENUM ('buy', 'sell');

-- CreateTable
CREATE TABLE "billings" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "amount" DECIMAL(9,2) NOT NULL,
    "type" "TypeBilling" NOT NULL DEFAULT 'deposit',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "billings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "btc_transactions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "billing_id" TEXT NOT NULL,
    "current_btc" DECIMAL(9,8) NOT NULL,
    "bought_btc" DECIMAL(9,8) NOT NULL,
    "variation_pc" DECIMAL(9,2) NOT NULL,
    "type" "TypeBtcTransaction" NOT NULL DEFAULT 'buy',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "btc_transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "billings" ADD CONSTRAINT "billings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "btc_transactions" ADD CONSTRAINT "btc_transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "btc_transactions" ADD CONSTRAINT "btc_transactions_billing_id_fkey" FOREIGN KEY ("billing_id") REFERENCES "billings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
