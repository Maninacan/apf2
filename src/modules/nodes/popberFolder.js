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

  const popberNodesLength = table.filteredAndSorted.popber.length

  let message = popberNodesLength
  if (table.popberLoading) {
    message = `...`
  }
  if (node.nodeLabelFilter.get(`popber`)) {
    message = `${popberNodesLength} gefiltert`
  }

  return {
    nodeType: `folder`,
    menuType: `popberFolder`,
    id: popId,
    label: `Kontroll-Berichte (${message})`,
    expanded: activeUrlElements.popberFolder,
    url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, popId, `Kontroll-Berichte`],
    level: 6,
    sort: [projIndex, 1, apIndex, 1, popIndex, 2],
    childrenLength: popberNodesLength,
  }
}
