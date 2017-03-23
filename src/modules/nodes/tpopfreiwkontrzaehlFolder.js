import findIndex from 'lodash/findIndex'

export default (store) => {
  const { activeUrlElements, node, table } = store

  // fetch sorting indexes of parents
  const projId = activeUrlElements.projekt
  if (!projId) return []
  const projIndex = findIndex(table.filteredAndSorted.projekt, { ProjId: projId })
  const apArtId = activeUrlElements.ap
  if (!apArtId) return []
  const apIndex = findIndex(table.filteredAndSorted.ap, { ApArtId: apArtId })
  const popId = activeUrlElements.pop
  if (!popId) return []
  const popIndex = findIndex(table.filteredAndSorted.pop, { PopId: popId })
  const tpopId = activeUrlElements.tpop
  if (!tpopId) return []
  const tpopIndex = findIndex(table.filteredAndSorted.tpop, { TPopId: tpopId })
  const tpopfreiwkontrId = activeUrlElements.tpopfreiwkontr
  if (!tpopfreiwkontrId) return []
  const tpopfreiwkontrIndex = findIndex(table.filteredAndSorted.tpopfreiwkontr, { TPopKontrId: tpopfreiwkontrId })

  const childrenLength = table.filteredAndSorted.tpopfreiwkontrzaehl.length

  let message = childrenLength
  if (table.tpopkontrLoading) {
    message = `...`
  }
  if (node.nodeLabelFilter.get(`tpopfreiwkontr`)) {
    message = `${childrenLength} gefiltert`
  }
  const sort = [projIndex, 1, apIndex, 1, popIndex, 1, tpopIndex, 4, tpopfreiwkontrIndex, 1]

  return {
    nodeType: `folder`,
    menuType: `tpopfreiwkontrzaehlFolder`,
    id: tpopfreiwkontrId,
    label: `Zählungen (${message})`,
    expanded: activeUrlElements.tpopfreiwkontrzaehlFolder,
    url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, popId, `Teil-Populationen`, tpopId, `Freiwilligen-Kontrollen`, tpopfreiwkontrId, `Zaehlungen`],
    level: 10,
    sort,
    childrenLength,
  }
}
