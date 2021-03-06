// @flow
import React from 'react'
import { WMSTileLayer } from 'react-leaflet'

const ZhPflegeplanLayer = () => (
  <WMSTileLayer
    url="//agabriel:4zC6MgjM@wms.zh.ch/FnsPflegeZHWMS"
    layers="FnsPflegeZHWMS,ueberlagerung1,ueberlagerung2"
    opacity={0.5}
    transparent={true}
    version="1.3.0"
    format="image/png"
  />
)

export default ZhPflegeplanLayer
