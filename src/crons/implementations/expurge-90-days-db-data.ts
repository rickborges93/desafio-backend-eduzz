import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export async function expurgeDBDataWith90DaysOrGreatter() {
  console.log('[Cron Job] Expurge database data with 90 days or greatter')

  const date = new Date()
  const date90DaysBefore = dayjs(date).subtract(90, 'days')

  await prisma.billing.deleteMany({
    where: {
      created_at: {
        lte: date90DaysBefore.toDate(),
      },
    },
  })
}
