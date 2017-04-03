export default (store) => {
  const { tree } = store

  // map through all filtered and sorted projekt and create array of nodes
  return tree.filteredAndSorted.projekt.map((el, index) => ({
    nodeType: `table`,
    menuType: `projekt`,
    id: el.ProjId,
    label: el.ProjName || `(kein Name)`,
    expanded: el.ProjId === tree.activeNodes.projekt,
    url: [`Projekte`, el.ProjId],
    sort: [index],
    hasChildren: true,
  }))
}
