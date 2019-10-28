import { promises as fs } from 'fs'
import os from 'os'
import path from 'path'

import prettyBytes from 'pretty-bytes'

import { all } from './suites/all'

const main = async () => {
  const cpus = os.cpus().reduce<[string, number][]>((ret, { model }) => {
    const prev = ret.some(([name]) => name === model)

    return prev
      ? ret.map(([name, cores]) => [name, name === model ? cores + 1 : cores])
      : ret.concat([[model, 1]])
  }, [])

  const totalMem = prettyBytes(os.totalmem())

  const results = await all()

  // Truncate JSON content by dropping unnecessary information
  const stats = {
    cpu: cpus.map(([name, cores]) => `${name} (${cores}core)`).join(', '),
    memory: totalMem,
    results: results.map(result => {
      return {
        ...result,
        results: result.results.map(r => ({
          ...r,
          options: void 0,
          details: void 0
        }))
      }
    }, {})
  }

  fs.writeFile(path.resolve(__dirname, './stats.json'), JSON.stringify(stats))
}

main()
