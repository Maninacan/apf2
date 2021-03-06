// @flow
import axios from 'axios'

import apiBaseUrl from '../../modules/apiBaseUrl'
import tables from '../../modules/tables'
import insertDatasetInIdb from './insertDatasetInIdb'

export default (
  store: Object,
  tree: Object,
  tablePassed: string,
  parentId: number,
  baseUrl: Array<string>,
): any => {
  let table = tablePassed
  if (!table) {
    return store.listError(new Error('no table passed'))
  }
  // insert new dataset in db and fetch id
  const tableMetadata = tables.find(t => t.table === table)
  if (!tableMetadata) {
    return store.listError(
      new Error(`no table meta data found for table "${table}"`),
    )
  }
  // some tables need to be translated, i.e. tpopfreiwkontr
  if (tableMetadata.dbTable) {
    table = tableMetadata.dbTable
  }
  // $FlowIssue
  const parentIdField = tableMetadata.parentIdField
  const idField = tableMetadata.idField
  if (!idField) {
    return store.listError(
      new Error('new dataset not created as no idField could be found'),
    )
  }
  const url = `${apiBaseUrl}/apflora/${table}/${parentIdField}/${parentId}`
  axios
    .post(url)
    .then(result => {
      const row = result.data
      // insert this dataset in store.table
      store.table[table].set(row[idField], row)
      // insert this dataset in idb
      insertDatasetInIdb(store, table, row)
      // set new url
      baseUrl.push(row[idField])
      tree.setActiveNodeArray(baseUrl)
      // if zieljahr, need to update ZielJahr
      if (tree.activeNodes.zieljahr) {
        store.updateProperty(tree, 'ZielJahr', tree.activeNodes.zieljahr)
        store.updatePropertyInDb(tree, 'ZielJahr', tree.activeNodes.zieljahr)
      }
      // if tpopfreiwkontr need to update TPopKontrTyp
      if (tablePassed === 'tpopfreiwkontr') {
        store.updateProperty(
          tree,
          'TPopKontrTyp',
          'Freiwilligen-Erfolgskontrolle',
        )
        store.updatePropertyInDb(
          tree,
          'TPopKontrTyp',
          'Freiwilligen-Erfolgskontrolle',
        )
      }
    })
    .catch(error => store.listError(error))
}
