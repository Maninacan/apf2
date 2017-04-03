import findIndex from 'lodash/findIndex'
import reduce from 'lodash/reduce'

export default (store) => {
  const { activeNodes } = store
  // fetch sorting indexes of parents
  const projId = activeNodes.projekt
  if (!projId) return []
  const projIndex = findIndex(store.tree.filteredAndSorted.projekt, { ProjId: projId })
  const apArtId = activeNodes.ap
  if (!apArtId) return []
  const apIndex = findIndex(store.tree.filteredAndSorted.ap, { ApArtId: apArtId })

  const qk = store.qk.get(apArtId)
  let nrOfQkMessages = 0
  if (qk && qk.messagesFiltered) {
    // need to count nr of urls, not nr of messages
    const nrOfUrls = reduce(qk.messagesFiltered, (sum, n) => sum + n.url.length, 0)
    nrOfQkMessages = nrOfUrls
  }
  if (qk && qk.filter) {
    nrOfQkMessages = `${nrOfQkMessages} gefiltert`
  }
  if (!store.activeNodes.qk) {
    // only show number when qk is active
    nrOfQkMessages = null
  }
  if (store.loading.includes(`qk`)) {
    nrOfQkMessages = `...`
  }

  return {
    nodeType: `folder`,
    menuType: `qkFolder`,
    id: apArtId,
    label: `Qualitätskontrollen${nrOfQkMessages ? ` (${nrOfQkMessages})` : ``}`,
    expanded: false,
    url: [`Projekte`, projId, `Arten`, apArtId, `Qualitaetskontrollen`],
    sort: [projIndex, 1, apIndex, 10],
    hasChildren: false,
  }
}
