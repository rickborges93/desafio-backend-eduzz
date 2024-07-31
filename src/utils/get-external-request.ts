import { BadRequestError } from '@/use-cases/errors/bad-request-error'

export async function getExternalRequest(
  url: string,
  acceptedStatusCode: number[],
) {
  const response = await fetch(url)

  if (acceptedStatusCode.indexOf(response.status) === -1) {
    throw new BadRequestError()
  }

  return response.json()
}
