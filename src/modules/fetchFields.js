// @flow
import axios from 'axios'
import { runInAction } from 'mobx'
import app from 'ampersand-app'

import apiBaseUrl from './apiBaseUrl'

export default (store:Object) => {
  // only fetch if not yet done
  if (store.app.fields.length === 0 && !store.loading.includes(`fields`)) {
    store.loading.push(`fields`)
    app.db.fields
      .toArray()
      .then((values) => {
        if (values.length > 0) {
          runInAction(() => {
            store.app.fields = values
            store.loading = store.loading.filter(el => el !== `fields`)
          })
        }
      })
      .then(() => axios.get(`${apiBaseUrl}/felder`))
      .then(({ data }) => {
        runInAction(() => {
          store.app.fields = data
          store.loading = store.loading.filter(el => el !== `fields`)
        })
        // leave ui react before this happens
        setTimeout(() => app.db.fields.bulkPut(data))
      })
      .catch(error => store.listError(error))
  }
}
