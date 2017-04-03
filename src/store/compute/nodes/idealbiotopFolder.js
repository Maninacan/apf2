import findIndex from 'lodash/findIndex'

export default (store) => {
  const { activeNodes } = store.tree

  // fetch sorting indexes of parents
  const projId = activeNodes.projekt
  if (!projId) return []
  const projIndex = findIndex(store.tree.filteredAndSorted.projekt, { ProjId: projId })
  const apArtId = activeNodes.ap
  if (!apArtId) return []
  const apIndex = findIndex(store.tree.filteredAndSorted.ap, { ApArtId: apArtId })

  return {
    nodeType: `folder`,
    menuType: `idealbiotopFolder`,
    id: apArtId,
    label: `Idealbiotop`,
    expanded: activeNodes.idealbiotopFolder,
    url: [`Projekte`, projId, `Arten`, apArtId, `Idealbiotop`],
    sort: [projIndex, 1, apIndex, 6],
    hasChildren: false,
  }
}
