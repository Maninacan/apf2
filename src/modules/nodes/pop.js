// @flow
import findIndex from 'lodash/findIndex'

export default (
  store: Object,
  tree: Object,
  projId: number,
  apArtId: number,
): Array<Object> => {
  // fetch sorting indexes of parents
  const projIndex = findIndex(tree.filteredAndSorted.projekt, {
    ProjId: projId,
  })
  const apIndex = findIndex(
    tree.filteredAndSorted.ap.filter(a => a.ProjId === projId),
    { ApArtId: apArtId },
  )

  // map through all pop and create array of nodes
  return tree.filteredAndSorted.pop
    .filter(p => p.ApArtId === apArtId)
    .map((el, index) => ({
      nodeType: 'table',
      menuType: 'pop',
      id: el.PopId,
      parentId: el.ApArtId,
      urlLabel: el.PopId,
      label: el.label,
      url: ['Projekte', projId, 'Arten', el.ApArtId, 'Populationen', el.PopId],
      sort: [projIndex, 1, apIndex, 1, index],
      hasChildren: true,
    }))
}
