import sortBy from 'lodash/sortBy'

export default (store, tree) => {
  const { table } = store
  const { activeNodes, nodeLabelFilter } = tree
  // grab tpop as array and sort them by year
  let tpop = Array.from(table.tpop.values())
  // show only nodes of active pop
  tpop = tpop.filter(a => a.PopId === activeNodes.pop)
  tpop = sortBy(tpop, `TPopNr`)
  // map through all projekt and create array of nodes
  tpop.forEach((el) => {
    el.label = `${el.TPopNr || `(keine Nr)`}: ${el.TPopFlurname || `(kein Flurname)`}`
  })
  // filter by nodeLabelFilter
  const filterString = nodeLabelFilter.get(`tpop`)
  if (filterString) {
    tpop = tpop.filter(p =>
      p.label.toLowerCase().includes(filterString.toLowerCase())
    )
  }
  return tpop
}