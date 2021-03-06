// @flow
import axios from 'axios'
import clone from 'lodash/clone'
import { toJS } from 'mobx'

import apiBaseUrl from '../../modules/apiBaseUrl'
import biotopFields from '../../modules/biotopFields'
import insertDatasetInIdb from './insertDatasetInIdb'

export default (store: Object, newId: number): void => {
  const { id } = store.copyingBiotop
  const rowToGetBiotopFrom = store.table.tpopkontr.get(id)
  if (!rowToGetBiotopFrom) {
    return store.listError(
      new Error('change was not saved because dataset was not found in store'),
    )
  }

  let rowToUpdate = store.table.tpopkontr.get(newId)
  const rowToUpdateBeforeUpdating = clone(rowToUpdate)
  // add biotop values from rowToGetBiotopFrom
  biotopFields.forEach(f => {
    if (rowToGetBiotopFrom[f] || rowToGetBiotopFrom[f] === 0) {
      rowToUpdate[f] = rowToGetBiotopFrom[f]
    }
  })
  rowToUpdate.MutWer = store.user.name
  rowToUpdate.MutWann = new Date().toISOString()
  const rowForDb = clone(toJS(rowToUpdate))
  // remove empty values
  Object.keys(rowForDb).forEach(k => {
    if ((!rowForDb[k] && rowForDb[k] !== 0) || rowForDb[k] === 'undefined') {
      delete rowForDb[k]
    }
  })
  // remove label: field does not exist in db, is computed
  delete rowForDb.label
  const rowForIdb = clone(rowForDb)
  // server expects TPopId to be called id
  rowForDb.id = rowForDb.TPopKontrId
  delete rowForDb.TPopKontrId
  // server expects user to be added as user
  rowForDb.user = store.user.name
  delete rowForDb.MutWer
  delete rowForDb.MutWann

  // update db
  const url = `${apiBaseUrl}/updateMultiple/apflora/tabelle=tpopkontr/felder=${JSON.stringify(rowForDb)}`
  axios
    .put(url)
    .then(() => {
      // put this dataset in idb
      insertDatasetInIdb(store, 'tpopkontr', rowForIdb)
    })
    .catch(error => {
      rowToUpdate = rowToUpdateBeforeUpdating
      store.listError(error)
    })
}
