// @flow
import isEqual from 'lodash/isEqual'
import clone from 'lodash/clone'
import queryString from 'query-string'

export default (store:Object) => {
  const url = clone(store.url)
  // forward apflora.ch to Projekte
  if (url.length === 0) {
    url.push(`Projekte`)
  }

  // if new store set projekte tabs
  const urlQuery = clone(store.urlQuery)
  if (
    (url.length === 0 || url[0] === `Projekte`) &&
    !urlQuery.projekteTabs
  ) {
    urlQuery.projekteTabs = [`strukturbaum`, `daten`]
  }
  const search = queryString.stringify(urlQuery)
  if (
    !isEqual(url, store.url) ||
    !isEqual(urlQuery, store.urlQuery)
  ) {
    const query = `${Object.keys(urlQuery).length > 0 ? `?${search}` : ``}`
    store.history.push(`/${url.join(`/`)}${query}`)
  }
}