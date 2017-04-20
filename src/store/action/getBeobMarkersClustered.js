// @flow
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import 'leaflet'
import '../../../node_modules/leaflet.markercluster/dist/leaflet.markercluster-src.js'
import some from 'lodash/some'

import beobIcon from '../../etc/beob.png'
import beobIconHighlighted from '../../etc/beobHighlighted.png'
import BeobPopup from '../../components/Projekte/Karte/BeobPopup'

export default (store: Object): Object => {
  const { beobs, highlightedIds } = store.map.beob
  const visible = store.map.activeOverlays.includes(`beob`)
  const mcgOptions = {
    maxClusterRadius: 66,
    iconCreateFunction: function(cluster) {
      const markers = cluster.getAllChildMarkers()
      const hasHighlightedTpop = some(
        markers,
        m => m.options.icon.options.className === `beobIconHighlighted`
      )
      return window.L.divIcon({
        html: markers.length,
        className: hasHighlightedTpop
          ? `beobClusterHighlighted`
          : `beobCluster`,
        iconSize: window.L.point(40, 40)
      })
    }
  }
  const markers = window.L.markerClusterGroup(mcgOptions)
  if (visible) {
    beobs.forEach(p => {
      const isHighlighted = highlightedIds.includes(
        isNaN(p.BeobId) ? p.BeobId : Number(p.BeobId)
      )
      const latLng = new window.L.LatLng(...p.KoordWgs84)
      const icon = window.L.icon({
        iconUrl: isHighlighted ? beobIconHighlighted : beobIcon,
        iconSize: [24, 24],
        className: isHighlighted ? `beobIconHighlighted` : `beobIcon`
      })
      const marker = window.L
        .marker(latLng, {
          title: p.label,
          icon,
          draggable: store.map.beob.assigning,
          zIndexOffset: -store.map.apfloraLayers.findIndex(
            apfloraLayer => apfloraLayer.value === `Beob`
          )
        })
        .bindPopup(
          ReactDOMServer.renderToStaticMarkup(
            <BeobPopup store={store} beobBereitgestellt={p} />
          )
        )
      markers.addLayer(marker)
    })
  }
  return markers
}
