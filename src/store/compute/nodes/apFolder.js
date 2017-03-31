import findIndex from 'lodash/findIndex'

export default (store) => {
  const { activeUrlElements, tree } = store
  // fetch sorting indexes of parents
  const projId = activeUrlElements.projekt
  if (!projId) return []
  const projIndex = findIndex(store.tree.filteredAndSorted.projekt, { ProjId: projId })
  // build label
  const apNodesLength = tree.filteredAndSorted.ap.length
  let message = apNodesLength
  if (store.table.apLoading) {
    message = `...`
  }
  if (store.tree.nodeLabelFilter.get(`ap`)) {
    message = `${apNodesLength} gefiltert`
  }

  return {
    nodeType: `folder`,
    menuType: `apFolder`,
    id: projId,
    label: `Arten (${message})`,
    expanded: activeUrlElements.apFolder,
    url: [`Projekte`, projId, `Arten`],
    sort: [projIndex, 1],
    hasChildren: apNodesLength > 0,
  }
}
