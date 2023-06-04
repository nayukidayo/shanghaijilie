import { Buffer } from 'node:buffer'
import db from './db.mjs'
import { EMQX_URL, EMQX_API_KEY, EMQX_SECRET_KEY } from './env.mjs'

const token = Buffer.from(`${EMQX_API_KEY}:${EMQX_SECRET_KEY}`).toString('base64')
const headers = new Headers({ Authorization: `Basic ${token}` })

function query(obj) {
  return fetch(`${EMQX_URL}/api/v5/clients/${obj.clientId}`, { headers })
}

export async function health() {
  const result = []

  for (let i = 0; i < db.length; i++) {
    const { flags, ...obj } = db[i]
    result.push(obj)
  }

  const arr = await Promise.allSettled(result.map(query))

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].status === 'fulfilled') {
      result[i].health = arr[i].value.ok
    } else {
      result[i].health = false
    }
  }

  return result
}

// console.log(await health())
