import sortBy from 'lodash/sortBy'

export default (store) => {
  const { table, tree } = store
  const { activeNodes } = tree
  // grab zielbere as array and sort them by year
  let zielbere = Array.from(table.zielber.values())
  zielbere = zielbere.filter(a => a.ZielId === activeNodes.ziel)
  // map through all and create array of nodes
  zielbere.forEach((el) => {
    el.label = `${el.ZielBerJahr || `(kein Jahr)`}: ${el.ZielBerErreichung || `(keine Entwicklung)`}`
  })
  // filter by tree.nodeLabelFilter
  const filterString = tree.nodeLabelFilter.get(`zielber`)
  if (filterString) {
    zielbere = zielbere.filter(p =>
      p.label.toLowerCase().includes(filterString.toLowerCase())
    )
  }
  // sort by label and return
  return sortBy(zielbere, `label`)
}
