// @flow
import axios from 'axios'
import app from 'ampersand-app'

import apiBaseUrl from './apiBaseUrl'
import tables from './tables'
import writeToStore from './writeToStore'

export default async (store:Object, schemaNamePassed:string, tableName:string) => {
  if (!tableName) {
    return store.listError(new Error(`action fetchTable: tableName must be passed`))
  }
  const schemaName = schemaNamePassed || `apflora`
  // only fetch if not yet fetched
  if (store.table[tableName].size === 0) {
    const tableMetadata = tables.find(t => t.table === tableName)
    if (!tableMetadata) {
      return store.listError(new Error(`keine Metadaten gefunden für Tabelle ${tableName}`))
    }
    const idField = tableMetadata.idField
    if (!idField) {
      return store.listError(new Error(`in den Metadaten kein ID-Feld gefunden für Tabelle ${tableName}`))
    }
    store.table[`${tableName}Loading`] = true
    let url = `${apiBaseUrl}/schema/${schemaName}/table/${tableName}`
    if (tableName === `adb_lr`) {
      url = `${apiBaseUrl}/lrDelarze`
    }

    let dataFromIdb
    try {
      dataFromIdb = await app.db[tableName].toArray()
    } catch(error) {
      store.listError(error)
    }
    if (dataFromIdb) {
      writeToStore({ store, data: dataFromIdb, table: tableName, field: idField })
      store.table[`${tableName}Loading`] = false
    }

    // don't reload adb_eigenschaften
    if (tableName === `adb_eigenschaften`) {
      store.table[`${tableName}Loading`] = false
      return
    }

    let dataFromDb
    try {
      const dataFromDbObject = await axios.get(url)
      dataFromDb = dataFromDbObject.data
    } catch(error) {
      store.listError(error)
    }
    if (dataFromDb && dataFromDb.length) {
      // leave ui react before this happens
      setTimeout(() => {
        // app.writeToStoreWorker.postMessage(`testmessage`)
        writeToStore({ store, data: dataFromDb, table: tableName, field: idField })
      })
      setTimeout(() =>
        app.db[tableName].bulkPut(dataFromDb)
      )
    }
    store.table[`${tableName}Loading`] = false
  }
}
