import 'leaflet'

export default (store) => {
  const { beobs, highlightedIds } = store.map.tpopBeob
  const visible = store.map.activeApfloraLayers.includes(`TpopBeobAssignPolylines`)
  if (visible) {
    return beobs.map((p) => {
      const isHighlighted = highlightedIds.includes(p.BeobId)
      const tpop = store.table.tpop.get(p.beobzuordnung.TPopId)
      const tpopKoord = (
        tpop && tpop.TPopKoordWgs84 ?
        tpop.TPopKoordWgs84 :
        p.KoordWgs84
      )
      const latlngs = [p.KoordWgs84, tpopKoord]

      return window.L.polyline(latlngs, {
        color: isHighlighted ? `yellow` : `#FF00FF`,
      })
    })
  }
  return []
}
