// @flow
import findIndex from 'lodash/findIndex'

export default (store: Object, tree: Object, projId: number): Array<Object> => {
  // check passed variables
  if (!store) return store.listError(new Error('no store passed'))
  if (!tree) return store.listError(new Error('no tree passed'))
  if (!projId) return store.listError(new Error('no projId passed'))

  const { filteredAndSorted, nodeLabelFilter } = tree

  // fetch sorting indexes of parents
  const projIndex = findIndex(filteredAndSorted.projekt, {
    ProjId: projId
  })

  // build label
  const myApNodes = filteredAndSorted.ap.filter(n => n.ProjId === projId)
  const apNodesLength = myApNodes.length
  let message = apNodesLength
  if (store.table.apLoading) {
    message = `...`
  }
  if (nodeLabelFilter.get(`ap`)) {
    message = `${apNodesLength} gefiltert`
  }

  return [
    {
      nodeType: `folder`,
      menuType: `apFolder`,
      id: projId,
      urlLabel: `Arten`,
      label: `Arten (${message})`,
      url: [`Projekte`, projId, `Arten`],
      sort: [projIndex, 1],
      hasChildren: apNodesLength > 0
    }
  ]
}
