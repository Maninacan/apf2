import React from 'react'
import ReactDOMServer from 'react-dom/server'
import 'leaflet'
import '../../node_modules/leaflet.markercluster/dist/leaflet.markercluster-src.js'
import some from 'lodash/some'

import beobIcon from '../etc/beob.png'
import beobIconHighlighted from '../etc/beobHighlighted.png'
import BeobPopup from '../components/Projekte/Karte/BeobPopup'

export default (store) => {
  const { beobs, highlightedIds } = store.map.beobNichtZuzuordnen
  const visible = store.map.activeApfloraLayers.includes(`BeobNichtZuzuordnen`)
  const mcgOptions = {
    maxClusterRadius: 66,
    iconCreateFunction: function (cluster) {
      const markers = cluster.getAllChildMarkers()
      const hasHighlightedTpop = some(markers, (m) => m.options.icon.options.className === `beobIconHighlighted`)
      const className = hasHighlightedTpop ? `beobClusterHighlighted` : `beobCluster`
      return window.L.divIcon({ html: markers.length, className, iconSize: window.L.point(40, 40) })
    },
  }
  const markers = window.L.markerClusterGroup(mcgOptions)
  if (visible) {
    beobs.forEach((p) => {
      const title = p.label
      const tooltipText = p.label
      const tooltipOptions = {
        permanent: true,
        direction: `bottom`,
        className: `mapTooltip`,
        opacity: 1,
      }
      const beobId = isNaN(p.BeobId) ? p.BeobId : Number(p.BeobId)
      const isHighlighted = highlightedIds.includes(beobId)
      const latLng = new window.L.LatLng(...p.KoordWgs84)
      const icon = window.L.icon({
        iconUrl: isHighlighted ? beobIconHighlighted : beobIcon,
        iconSize: [24, 24],
        // iconAnchor: [12, 12],
        className: isHighlighted ? `beobIconHighlighted` : `beobIcon`,
      })
      const marker = window.L.marker(latLng, {
        title,
        icon,
        zIndexOffset: -store.map.apfloraLayers.findIndex((apfloraLayer) =>
          apfloraLayer.value === `BeobNichtZuzuordnen`
        )
      }).bindPopup(ReactDOMServer.renderToStaticMarkup(<BeobPopup store={store} beobBereitgestellt={p} />))
        .bindTooltip(tooltipText, tooltipOptions)
      markers.addLayer(marker)
    })
  }
  return markers
}
