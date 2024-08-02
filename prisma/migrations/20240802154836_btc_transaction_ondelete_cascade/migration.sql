-- DropForeignKey
ALTER TABLE "btc_transactions" DROP CONSTRAINT "btc_transactions_billing_id_fkey";

-- AddForeignKey
ALTER TABLE "btc_transactions" ADD CONSTRAINT "btc_transactions_billing_id_fkey" FOREIGN KEY ("billing_id") REFERENCES "billings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
