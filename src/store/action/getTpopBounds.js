export default (tpopsPassed: Array<Object>): Array<Array<number>> => {
  const tpops = tpopsPassed.filter(t => !!t.TPopKoordWgs84)
  if (tpops.length === 0) return []
  const xKoords = tpops.map(p => p.TPopKoordWgs84[0])
  const yKoords = tpops.map(p => p.TPopKoordWgs84[1])
  const maxX = Math.max(...xKoords)
  const minX = Math.min(...xKoords)
  const maxY = Math.max(...yKoords)
  const minY = Math.min(...yKoords)
  return [[minX, minY], [maxX, maxY]]
}
