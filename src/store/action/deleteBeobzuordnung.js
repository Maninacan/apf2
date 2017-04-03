import queryString from 'query-string'
import axios from 'axios'

import apiBaseUrl from '../../modules/apiBaseUrl'
import deleteDatasetInIdb from './deleteDatasetInIdb'

export default (store, beobId) => {
  const { tree, urlQuery, history, table } = store
  const { activeNodes } = tree
  // delete beobzuordnung
  const deleteUrl = `${apiBaseUrl}/apflora/tabelle=beobzuordnung/tabelleIdFeld=NO_NOTE/tabelleId=${beobId}`
  axios.delete(deleteUrl)
    .then(() => {
      // remove this dataset in store.table
      table.beobzuordnung.delete(beobId)
      // remove from idb
      deleteDatasetInIdb(store, `beobzuordnung`, beobId)
      // set url to corresponding beob_bereitgestellt
      const query = `${Object.keys(urlQuery).length > 0 ? `?${queryString.stringify(urlQuery)}` : ``}`
      const newUrl = `/Projekte/${activeNodes.projekt}/Arten/${activeNodes.ap}/nicht-beurteilte-Beobachtungen/${beobId}${query}`
      history.push(newUrl)
    })
    .catch((error) =>
      store.listError(error)
    )
}
