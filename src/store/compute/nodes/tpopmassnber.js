import findIndex from 'lodash/findIndex'

export default (store) => {
  const { activeUrlElements, node } = store
  // fetch sorting indexes of parents
  const projId = activeUrlElements.projekt
  if (!projId) return []
  const projIndex = findIndex(node.filteredAndSorted.projekt, { ProjId: projId })
  const apArtId = activeUrlElements.ap
  if (!apArtId) return []
  const apIndex = findIndex(node.filteredAndSorted.ap, { ApArtId: apArtId })
  const popId = activeUrlElements.pop
  if (!popId) return []
  const popIndex = findIndex(node.filteredAndSorted.pop, { PopId: popId })
  const tpopId = activeUrlElements.tpop
  if (!tpopId) return []
  const tpopIndex = findIndex(node.filteredAndSorted.tpop, { TPopId: tpopId })

  return node.filteredAndSorted.tpopmassnber.map((el, index) => ({
    nodeType: `table`,
    menuType: `tpopmassnber`,
    parentId: tpopId,
    id: el.TPopMassnBerId,
    label: el.label,
    expanded: el.TPopMassnBerId === activeUrlElements.tpopmassnber,
    url: [`Projekte`, projId, `Arten`, apArtId, `Populationen`, popId, `Teil-Populationen`, tpopId, `Massnahmen-Berichte`, el.TPopMassnBerId],
    sort: [projIndex, 1, apIndex, 1, popIndex, 1, tpopIndex, 2, index],
    hasChildren: false,
  }))
}
