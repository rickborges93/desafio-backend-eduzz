import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Purchase (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to purchase', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/account/deposit')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 100,
      })

    const response = await request(app.server)
      .post('/btc/purchase')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 100,
      })

    expect(response.statusCode).toEqual(201)
  })
})
