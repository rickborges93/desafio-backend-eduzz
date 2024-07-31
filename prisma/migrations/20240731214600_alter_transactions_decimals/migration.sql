-- AlterTable
ALTER TABLE "btc_transactions" ALTER COLUMN "current_btc" SET DATA TYPE DECIMAL(17,8),
ALTER COLUMN "bought_btc" SET DATA TYPE DECIMAL(17,8);
