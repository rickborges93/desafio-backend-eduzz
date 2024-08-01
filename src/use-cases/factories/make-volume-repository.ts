import { PrismaBtcTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { VolumeUseCase } from '../volume/volume'

export function makeVolumeUseCase() {
  const transactionsRepository = new PrismaBtcTransactionsRepository()
  const volumeUseCase = new VolumeUseCase(transactionsRepository)

  return volumeUseCase
}
