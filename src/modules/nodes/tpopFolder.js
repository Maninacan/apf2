import findIndex from 'lodash/findIndex'

export default (
  store: Object,
  tree: Object,
  projId: number,
  apArtId: number,
  popId: number
): Array<Object> => {
  // check passed variables
  if (!store) return store.listError(new Error('no store passed'))
  if (!tree) return store.listError(new Error('no tree passed'))
  if (!projId) return store.listError(new Error('no projId passed'))
  if (!apArtId) return store.listError(new Error('no apArtId passed'))
  if (!popId) return store.listError(new Error('no popId passed'))

  const { table } = store

  // fetch sorting indexes of parents
  const projIndex = findIndex(tree.filteredAndSorted.projekt, {
    ProjId: projId
  })
  const apIndex = findIndex(
    tree.filteredAndSorted.ap.filter(a => a.ProjId === projId),
    { ApArtId: apArtId }
  )
  const popIndex = findIndex(
    tree.filteredAndSorted.pop.filter(p => p.ApArtId === apArtId),
    { PopId: popId }
  )
  // prevent folder from showing when nodeFilter is set
  if (popIndex === -1) return []

  const childrenLength = tree.filteredAndSorted.tpop.filter(
    t => t.PopId === popId
  ).length

  let message = childrenLength
  if (table.tpopLoading) {
    message = `...`
  }
  if (tree.nodeLabelFilter.get(`tpop`)) {
    message = `${childrenLength} gefiltert`
  }

  return [
    {
      nodeType: `folder`,
      menuType: `tpopFolder`,
      id: popId,
      urlLabel: `Teil-Populationen`,
      label: `Teil-Populationen (${message})`,
      url: [
        `Projekte`,
        projId,
        `Arten`,
        apArtId,
        `Populationen`,
        popId,
        `Teil-Populationen`
      ],
      sort: [projIndex, 1, apIndex, 1, popIndex, 1],
      hasChildren: childrenLength > 0
    }
  ]
}