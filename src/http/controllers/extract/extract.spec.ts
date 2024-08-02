import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Extract (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get the extract', async () => {
    await request(app.server).post('/account').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/login').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { token } = authResponse.body

    await request(app.server)
      .post('/account/deposit')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 100,
      })

    await request(app.server)
      .post('/btc/purchase')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 100,
      })

    const response = await request(app.server)
      .get('/extract')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        btcTransactions: expect.any(Array),
        billings: expect.any(Array),
      }),
    )
  })
})
