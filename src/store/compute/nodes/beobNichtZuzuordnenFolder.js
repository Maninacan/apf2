import findIndex from 'lodash/findIndex'

export default (store) => {
  const { activeUrlElements, tree } = store

  // fetch sorting indexes of parents
  const projId = activeUrlElements.projekt
  if (!projId) return []
  const projIndex = findIndex(store.tree.filteredAndSorted.projekt, { ProjId: projId })
  const apArtId = activeUrlElements.ap
  if (!apArtId) return []
  const apIndex = findIndex(store.tree.filteredAndSorted.ap, { ApArtId: apArtId })

  const beobNichtZuzuordnenNodesLength = tree.filteredAndSorted.beobNichtZuzuordnen.length

  let message = beobNichtZuzuordnenNodesLength
  if (store.loading.includes(`beobzuordnung`)) {
    message = `...`
  }
  if (store.tree.nodeLabelFilter.get(`beobNichtZuzuordnen`)) {
    message = `${beobNichtZuzuordnenNodesLength} gefiltert`
  }

  return {
    nodeType: `folder`,
    menuType: `beobNichtZuzuordnenFolder`,
    id: apArtId,
    label: `Beobachtungen nicht zuzuordnen (${message})`,
    expanded: activeUrlElements.beobNichtZuzuordnenFolder,
    url: [`Projekte`, projId, `Arten`, apArtId, `nicht-zuzuordnende-Beobachtungen`],
    sort: [projIndex, 1, apIndex, 9],
    hasChildren: beobNichtZuzuordnenNodesLength > 0,
  }
}
