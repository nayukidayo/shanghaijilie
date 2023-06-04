import { env } from 'node:process'

export const PORT = env.PORT || 443

export const INFLUX_URL = env.INFLUX_URL
export const INFLUX_ORG = env.INFLUX_ORG
export const INFLUX_BUCKET = env.INFLUX_BUCKET
export const INFLUX_TOKEN = env.INFLUX_TOKEN

export const EMQX_URL = env.EMQX_URL
export const EMQX_API_KEY = env.EMQX_API_KEY
export const EMQX_SECRET_KEY = env.EMQX_SECRET_KEY
