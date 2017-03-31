import findIndex from 'lodash/findIndex'

export default (store) => {
  const { activeUrlElements, node, table } = store

  // fetch sorting indexes of parents
  const projId = activeUrlElements.projekt
  if (!projId) return []
  const projIndex = findIndex(node.filteredAndSorted.projekt, { ProjId: projId })
  const apArtId = activeUrlElements.ap
  if (!apArtId) return []
  const apIndex = findIndex(node.filteredAndSorted.ap, { ApArtId: apArtId })
  const popId = activeUrlElements.pop
  if (!popId) return []
  const popIndex = findIndex(node.filteredAndSorted.pop, { PopId: popId })
  const tpopId = activeUrlElements.tpop
  if (!tpopId) return []
  const tpopIndex = findIndex(node.filteredAndSorted.tpop, { TPopId: tpopId })

  const childrenLength = node.filteredAndSorted.tpopfreiwkontr.length

  let message = childrenLength
  if (table.tpopkontrLoading) {
    message = `...`
  }
  if (node.nodeLabelFilter.get(`tpopfreiwkontr`)) {
    message = `${childrenLength} gefiltert`
  }

  return {
    nodeType: `folder`,
    menuType: `tpopfreiwkontrFolder`,
    id: tpopId,
    label: `Freiwilligen-Kontrollen (${message})`,
    expanded: activeUrlElements.tpopfreiwkontrFolder,
    url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, popId, `Teil-Populationen`, tpopId, `Freiwilligen-Kontrollen`],
    level: 8,
    sort: [projIndex, 1, apIndex, 1, popIndex, 1, tpopIndex, 4],
    childrenLength,
  }
}