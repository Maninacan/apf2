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

  const popNodesLength = table.filteredAndSorted.pop.length
  let message = popNodesLength
  if (store.table.popLoading) {
    message = `...`
  }
  if (store.node.nodeLabelFilter.get(`pop`)) {
    message = `${popNodesLength} gefiltert`
  }
  const sort = [projIndex, 1, apIndex, 1]

  return {
    nodeType: `folder`,
    menuType: `popFolder`,
    id: apArtId,
    label: `Populationen (${message})`,
    expanded: activeUrlElements.popFolder,
    url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`],
    level: 4,
    sort,
    childrenLength: popNodesLength,
  }
}
