import findIndex from 'lodash/findIndex'

export default (store, tree, projId, apArtId) => {
  // check passed variables
  if (!store) return store.listError(new Error('no store passed'))
  if (!tree) return store.listError(new Error('no tree passed'))
  if (!apArtId) return store.listError(new Error('no apArtId passed'))
  if (!projId) return store.listError(new Error('no projId passed'))

  // fetch sorting indexes of parents
  const projIndex = findIndex(tree.filteredAndSorted.projekt, {
    ProjId: projId
  })
  const apIndex = findIndex(tree.filteredAndSorted.ap, { ApArtId: apArtId })

  const nodes = tree.filteredAndSorted.zieljahr.map((z, index) => {
    // get nr of ziele for year
    // const nrOfZieleThisYear = ziele.filter(z => z.ZielJahr === jahr).length
    const childrenLength = tree.filteredAndSorted.ziel.length

    return {
      nodeType: `folder`,
      menuType: `zieljahr`,
      id: apArtId,
      parentId: apArtId,
      urlLabel: z.jahr == null ? `kein-Jahr` : z.jahr,
      label: `${z.jahr == null ? `kein Jahr` : z.jahr} (${z.length})`,
      url: [`Projekte`, projId, `Arten`, apArtId, `AP-Ziele`, z.jahr],
      sort: [projIndex, 1, apIndex, 2, index],
      hasChildren: childrenLength > 0
    }
  })
  return nodes
}