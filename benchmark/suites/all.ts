type UnwrapPromise<P> = P extends Promise<infer T> ? T : never

export const all = async () => {
  const suites = await Promise.all([
    import('./hex-to-rgb'),
    import('./blend'),
    import('./darken'),
    import('./lighten'),
    import('./relative-luminance'),
    import('./set-alpha')
  ]).then(mods => mods.map(mod => mod.default))

  const result: UnwrapPromise<ReturnType<typeof suites[0]>>[] = []

  for (const suite of suites) {
    result.push(await suite())
    console.log('\n---------\n')
  }

  return result
}

export default all

if (require.main === module) {
  all()
}
