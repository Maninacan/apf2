import findIndex from 'lodash/findIndex'
import sortBy from 'lodash/sortBy'

export default (store, jahr) => {
  const { activeUrlElements, table } = store
  // fetch sorting indexes of parents
  const projId = activeUrlElements.projekt
  if (!projId) return []
  const projIndex = findIndex(table.filteredAndSorted.projekt, { ProjId: projId })
  const apArtId = activeUrlElements.ap
  if (!apArtId) return []
  const apIndex = findIndex(table.filteredAndSorted.ap, { ApArtId: apArtId })
  const zieljahr = activeUrlElements.zieljahr
  const zieljahrIndex = findIndex(table.filteredAndSorted.zieljahr, { jahr: zieljahr })
  console.log(`zieljahr:`, zieljahr)
  console.log(`zieljahrIndex:`, zieljahrIndex)
  console.log(`table.filteredAndSorted.ziel:`, table.filteredAndSorted.ziel)

  // map through all and create array of nodes
  let nodes = table.filteredAndSorted.ziel.map((el, index) => {
    const sort = [projIndex, 1, apIndex, 2, zieljahrIndex, index]

    return {
      nodeType: `table`,
      menuType: `ziel`,
      id: el.ZielId,
      parentId: el.ApArtId,
      label: el.label,
      expanded: el.ZielId === activeUrlElements.ziel,
      url: [`Projekte`, projId, `Arten`, el.ApArtId, `AP-Ziele`, el.ZielJahr, el.ZielId],
      level: 6,
      sort,
      childrenLength: 1,
    }
  })
  console.log(`nodes:`, nodes)
  return nodes
}
