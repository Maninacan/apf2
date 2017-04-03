import findIndex from 'lodash/findIndex'

export default (store) => {
  const { tree, table } = store
  const { activeNodes } = tree

  // fetch sorting indexes of parents
  const projId = activeNodes.projekt
  if (!projId) return []
  const projIndex = findIndex(tree.filteredAndSorted.projekt, { ProjId: projId })
  const apArtId = activeNodes.ap
  if (!apArtId) return []
  const apIndex = findIndex(tree.filteredAndSorted.ap, { ApArtId: apArtId })
  const popId = activeNodes.pop
  if (!popId) return []
  const popIndex = findIndex(tree.filteredAndSorted.pop, { PopId: popId })
  const tpopId = activeNodes.tpop
  if (!tpopId) return []
  const tpopIndex = findIndex(tree.filteredAndSorted.tpop, { TPopId: tpopId })

  const childrenLength = tree.filteredAndSorted.tpopfeldkontr.length

  let message = childrenLength
  if (table.tpopkontrLoading) {
    message = `...`
  }
  if (tree.nodeLabelFilter.get(`tpopfeldkontr`)) {
    message = `${childrenLength} gefiltert`
  }

  return {
    nodeType: `folder`,
    menuType: `tpopfeldkontrFolder`,
    id: tpopId,
    label: `Feld-Kontrollen (${message})`,
    expanded: activeNodes.tpopfeldkontrFolder,
    url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, popId, `Teil-Populationen`, tpopId, `Feld-Kontrollen`],
    sort: [projIndex, 1, apIndex, 1, popIndex, 1, tpopIndex, 3],
    hasChildren: childrenLength > 0,
  }
}
