import cron from 'node-cron'
import { expurgeDBDataWith90DaysOrGreatter } from './implementations/expurge-90-days-db-data'

export async function appCronJobs() {
  cron.schedule('0 3 * * *', expurgeDBDataWith90DaysOrGreatter) // everyday at 03:00 AM
}
