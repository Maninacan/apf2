// @flow
import React from 'react'
import { WMSTileLayer } from 'react-leaflet'

const UepLayer = () =>
  <WMSTileLayer
    url="//agabriel:4zC6MgjM@wms.zh.ch/upwms"
    layers="Uebersichtsplan"
    transparent={true}
    version="1.3.0"
    format="image/png"
  />

export default UepLayer
