// @flow
import {
  extendObservable,
  computed,
} from 'mobx'

import getTpopsForMap from '../modules/getTpopsForMap'
import getTpopBounds from '../modules/getTpopBounds'
import getTpopMarkers from '../modules/getTpopMarkers'
import getTpopMarkersClustered from '../modules/getTpopMarkersClustered'

export default (store:Object) => {
  extendObservable(store.map.tpop, {
    highlightedIds: computed(
      () => {
        const nodeMapFilterTpop = store.node.nodeMapFilter.tpop
        if (nodeMapFilterTpop.length > 0) {
          return nodeMapFilterTpop
        }
        if (store.activeUrlElements.tpop) {
          return [store.activeUrlElements.tpop]
        }
        return []
      },
      { name: `mapTpopHighlightedIds` }
    ),
    highlightedPopIds: [],
    tpops: computed(() =>
      getTpopsForMap(store),
      { name: `mapTpopTpops` }
    ),
    bounds: computed(() =>
      getTpopBounds(store.map.tpop.tpops),
      { name: `mapTpopBounds` }
    ),
    boundsOfHighlightedIds: computed(
      () => getTpopBounds(
        store.map.tpop.tpops
          .filter(t => store.map.tpop.highlightedIds.includes(t.TPopId))
      ),
      { name: `mapTpopBoundsOfHighlightedIds` }
    ),
    // alternative is using names
    labelUsingNr: true,
    markers: computed(() =>
      getTpopMarkers(store),
      { name: `mapTpopMarkers` }
    ),
    markersClustered: computed(() =>
      getTpopMarkersClustered(store),
      { name: `mapTpopMarkersClustered` }
    ),
    idOfTpopBeingLocalized: 0,
  })
}
