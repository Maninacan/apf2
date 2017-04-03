import sortBy from 'lodash/sortBy'

export default (store) => {
  const { table, tree } = store
  const { activeNodes } = tree
  // grab ziele as array
  let ziele = Array.from(table.ziel.values())
  // show only nodes of active ap
  const activeAp = activeNodes.ap
  ziele = ziele.filter(a => a.ApArtId === activeAp)
  // show only nodes of active zieljahr
  const jahr = activeNodes.zieljahr
  ziele = ziele.filter((a) => {
    if (jahr === null || jahr === undefined) {
      return a.ZielJahr !== 0 && !a.ZielJahr
    }
    return a.ZielJahr === jahr
  })
  // get zielWerte
  const zieltypWerte = Array.from(table.ziel_typ_werte.values())
  // map through all and create array of nodes
  ziele.forEach((el) => {
    const zielWert = zieltypWerte.find(e => e.ZieltypId === el.ZielTyp)
    const zieltypTxt = zielWert ? zielWert.ZieltypTxt : `kein Zieltyp`
    el.label = `${el.ZielBezeichnung || `(kein Ziel)`} (${zieltypTxt})`
  })
  // filter by tree.nodeLabelFilter
  const filterString = tree.nodeLabelFilter.get(`ziel`)
  if (filterString) {
    ziele = ziele.filter(p =>
      p.label.toLowerCase().includes(filterString.toLowerCase())
    )
  }
  // sort by label and return
  return sortBy(ziele, `label`)
}