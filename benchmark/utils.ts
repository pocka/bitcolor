import assert from 'assert'

import * as benny from 'benny'

interface Test {
  name: string
  expected?: any
  run(): void
}

export const suite = (
  name: string,
  module: NodeModule,
  tests: readonly Test[]
) => {
  // Do assertion before benchmark runs
  tests.forEach(test => {
    if (Object.prototype.hasOwnProperty.call(test, 'expected')) {
      const actual = test.run()

      assert.deepEqual(
        actual,
        test.expected,
        `Pre assertion failed at [${name} > ${test.name}]: expected=${test.expected}, recieved=${actual}`
      )
    }
  })

  const ret = () =>
    benny.suite(
      name,
      ...tests.map(test => benny.add(test.name, test.run)),
      benny.cycle(),
      benny.complete()
    )

  if (require.main === module) {
    ret()
  }

  return ret
}
