import findIndex from 'lodash/findIndex'

export default (
  store: Object,
  tree: Object,
  projId: number,
  apArtId: number,
  popId: number,
  tpopId: number,
  tpopkontrId: number
): Array<Object> => {
  // check passed variables
  if (!store) return store.listError(new Error('no store passed'))
  if (!tree) return store.listError(new Error('no tree passed'))
  if (!projId) return store.listError(new Error('no projId passed'))
  if (!apArtId) return store.listError(new Error('no apArtId passed'))
  if (!popId) return store.listError(new Error('no popId passed'))
  if (!tpopId) return store.listError(new Error('no tpopId passed'))
  if (!tpopkontrId) return store.listError(new Error('no tpopkontrId passed'))

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
  const tpopIndex = findIndex(
    tree.filteredAndSorted.tpop.filter(t => t.PopId === popId),
    { TPopId: tpopId }
  )
  const tpopfeldkontrIndex = findIndex(
    tree.filteredAndSorted.tpopfeldkontr.filter(t => t.TPopId === tpopId),
    {
      TPopKontrId: tpopkontrId
    }
  )
  // prevent folder from showing when nodeFilter is set
  if (tpopfeldkontrIndex === -1) return []

  return tree.filteredAndSorted.tpopfeldkontrzaehl
    .filter(z => z.TPopKontrId === tpopkontrId)
    .map((el, index) => ({
      nodeType: `table`,
      menuType: `tpopfeldkontrzaehl`,
      id: el.TPopKontrZaehlId,
      parentId: tpopkontrId,
      urlLabel: el.TPopKontrZaehlId,
      label: el.label,
      url: [
        `Projekte`,
        projId,
        `Arten`,
        apArtId,
        `Populationen`,
        popId,
        `Teil-Populationen`,
        tpopId,
        `Feld-Kontrollen`,
        tpopkontrId,
        `Zaehlungen`,
        el.TPopKontrZaehlId
      ],
      sort: [
        projIndex,
        1,
        apIndex,
        1,
        popIndex,
        1,
        tpopIndex,
        3,
        tpopfeldkontrIndex,
        1,
        index
      ],
      hasChildren: false
    }))
}