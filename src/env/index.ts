import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['developer', 'test', 'production']).default('developer'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
  SENDGRID_API_KEY: z.string(),
  MAIL_PROVIDER_NAME: z.string(),
  MAIL_PROVIDER_EMAIL: z.string(),
  RABBITMQ_URL: z.string().default('amqp://localhost:5672'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
