// @flow
import { observable } from 'mobx'

import tableNames from '../modules/tableStoreNames'

const initiateObservables = (tableObject: Object): void => {
  tableNames.forEach(tableName => {
    tableObject[tableName] = observable.map()
  })
}

const Table = {}
initiateObservables(Table)

export default Table
