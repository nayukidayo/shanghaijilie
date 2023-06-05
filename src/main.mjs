import { readFileSync } from 'node:fs'
import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import { latest, history, hour } from './influx.mjs'
import { health } from './emqx.mjs'
import { PORT } from './env.mjs'

const fastify = Fastify({
  https: {
    key: readFileSync('cert/ems.hztauto.com.key'),
    cert: readFileSync('cert/ems.hztauto.com.crt'),
  },
  logger: false,
})

fastify.register(fastifyStatic, {
  root: new URL('../public', import.meta.url),
})

fastify.get('/api/device', async (_, res) => {
  const data = await health()
  res.type('application/json').code(200)
  return data
})

fastify.post('/api/telemetry/latest', async (req, res) => {
  const { device } = req.body
  const data = await latest(device)
  res.type('application/json').code(200)
  return data
})

fastify.post('/api/telemetry/history', async (req, res) => {
  const { device, flag, duration } = req.body
  const data = await history(device, flag, duration)
  res.type('application/json').code(200)
  return data
})

fastify.post('/api/telemetry/hour', async (req, res) => {
  const { device } = req.body
  const data = await hour(device)
  res.type('application/json').code(200)
  return data
})

fastify.listen({ port: PORT, host: '0.0.0.0' })
