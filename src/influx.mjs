import { InfluxDB } from '@influxdata/influxdb-client'
import { INFLUX_URL, INFLUX_ORG, INFLUX_BUCKET, INFLUX_TOKEN } from './env.mjs'
import db from './db.mjs'

const mea = 'shanghai'
const dur = {
  '1h': { start: '-61m', every: '12m', n: '5' },
  '1d': { start: '-25h', every: '4h', n: '6' },
  '7d': { start: '-8d', every: '1d', n: '7' },
}

const query = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN }).getQueryApi(INFLUX_ORG)

export async function latest(deivce) {
  const flux = `from(bucket: "${INFLUX_BUCKET}") |> range(start: -1h) |> filter(fn: (r) => r._measurement == "${mea}" and r.device == "${deivce}") |> last()`
  const result = []

  for await (const { values, tableMeta } of query.iterateRows(flux)) {
    const obj = tableMeta.toObject(values)
    const meta = db.find(v => v.id === deivce).flags[obj.flag]

    if (!meta) continue

    result.push({
      flag: obj.flag,
      name: meta.name,
      unit: meta.unit,
      // value: obj._value,
      value: (meta.precision * obj._value) | 0,
      time: obj._time,
    })
  }

  return result
}

// console.log(await latest('01'))

export async function history(deivce, flag, duration) {
  const { start, every, n } = dur[duration]
  const flux = `from(bucket: "${INFLUX_BUCKET}") |> range(start: ${start}) |> filter(fn: (r) => r._measurement == "${mea}" and r.device == "${deivce}" and r.flag == "${flag}") |> aggregateWindow(every: ${every}, fn: mean, createEmpty: false) |> tail(n: ${n}, offset: 1)`

  const meta = db.find(v => v.id === deivce).flags[flag]
  const result = { name: meta.name, unit: meta.unit, value: [], time: [] }

  for await (const { values, tableMeta } of query.iterateRows(flux)) {
    const obj = tableMeta.toObject(values)
    // result.value.push(obj._value)
    result.value.push((meta.precision * obj._value) | 0)
    result.time.push(obj._time)
  }

  return result
}

// console.log(await history('01', 'REG20020', '1h'))

export async function hour(deivce) {
  const flux = `from(bucket: "${INFLUX_BUCKET}") |> range(start: -61m) |> filter(fn: (r) => r._measurement == "${mea}" and r.device == "${deivce}") |> aggregateWindow(every: 10m, fn: mean, createEmpty: false) |> tail(n: 6, offset: 1)`

  const flags = db.find(v => v.id === deivce).flags
  const result = { time: [] }

  for await (const { values, tableMeta } of query.iterateRows(flux)) {
    const obj = tableMeta.toObject(values)
    const meta = flags[obj.flag]

    if (!meta) continue

    if (!result[obj.flag]) {
      result[obj.flag] = { name: meta.name, data: [] }
    }
    result[obj.flag].data.push((meta.precision * obj._value) | 0)

    if (result.time.length < 6) {
      const date = new Date(obj._time)
      result.time.push(`${date.getHours()}:${date.getMinutes().toString().padEnd(2, '0')}`)
    }
  }

  return result
}

// console.log(await hour('01'))
