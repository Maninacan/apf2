// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import styled from 'styled-components'
import compose from 'recompose/compose'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'

import TreeContainer from './TreeContainer'
import Daten from './Daten'
import Karte from './Karte'
import Exporte from './Exporte'

const Container = styled(({ loading, children, ...rest }) => (
  <div {...rest}>{children}</div>
))`
  display: flex;
  flex-direction: column;
  height: calc(100% - 49.3px);
  cursor: ${props => (props.loading ? 'wait' : 'inherit')}
`
const KarteContainer = styled.div`
  border-color: #424242;
  border-width: 1px;
  border-style: solid;
  height: 100%;
  overflow: hidden;
`

const enhance = compose(inject('store'), observer)

const myChildren = (store: Object) => {
  const projekteTabs = toJS(store.urlQuery.projekteTabs)
  // if daten and exporte are shown, only show exporte
  if (projekteTabs.includes('daten') && projekteTabs.includes('exporte')) {
    const i = projekteTabs.indexOf('daten')
    projekteTabs.splice(i, 1)
  }

  const children = []
  if (projekteTabs.includes('tree')) {
    children.push(
      <ReflexElement key="tree">
        <TreeContainer tree={store.tree} />
      </ReflexElement>,
    )
    projekteTabs.splice(projekteTabs.indexOf('tree'), 1)
    if (projekteTabs.length > 0) {
      children.push(<ReflexSplitter key="treeSplitter" />)
    }
  }
  if (projekteTabs.includes('daten')) {
    children.push(
      <ReflexElement key="daten"><Daten tree={store.tree} /></ReflexElement>,
    )
    projekteTabs.splice(projekteTabs.indexOf('daten'), 1)
    if (projekteTabs.length > 0) {
      children.push(<ReflexSplitter key="treeDaten" />)
    }
  }
  if (projekteTabs.includes('exporte')) {
    children.push(<ReflexElement key="exporte"><Exporte /></ReflexElement>)
    projekteTabs.splice(projekteTabs.indexOf('exporte'), 1)
    if (projekteTabs.length > 0) {
      children.push(<ReflexSplitter key="exporteSplitter" />)
    }
  }
  if (projekteTabs.includes('tree2')) {
    children.push(
      <ReflexElement key="tree2">
        <TreeContainer tree={store.tree2} />
      </ReflexElement>,
    )
    projekteTabs.splice(projekteTabs.indexOf('tree2'), 1)
    if (projekteTabs.length > 0) {
      children.push(<ReflexSplitter key="tree2Splitter" />)
    }
  }
  if (projekteTabs.includes('daten2')) {
    children.push(
      <ReflexElement key="daten2"><Daten tree={store.tree2} /></ReflexElement>,
    )
    projekteTabs.splice(projekteTabs.indexOf('daten2'), 1)
    if (projekteTabs.length > 0) {
      children.push(<ReflexSplitter key="daten2Splitter" />)
    }
  }
  if (projekteTabs.includes('karte')) {
    children.push(
      <ReflexElement
        key="karte"
        className="karte"
        style={{ overflow: 'hidden' }}
      >
        <KarteContainer>
          <Karte
            /**
           * key of tabs is added to force mounting
           * when tabs change
           * without remounting grey space remains
           * when daten or tree tab is removed :-(
           */
            key={store.urlQuery.projekteTabs.toString()}
            popMarkers={store.map.pop.markers}
            popHighlighted={store.map.pop.highlightedIds.join()}
            tpopMarkers={store.map.tpop.markers}
            tpopHighlighted={store.map.tpop.highlightedIds.join()}
            tpopMarkersClustered={store.map.tpop.markersClustered}
            beobNichtBeurteiltMarkers={store.map.beobNichtBeurteilt.markers}
            beobNichtBeurteiltHighlighted={store.map.beobNichtBeurteilt.highlightedIds.join()}
            beobNichtBeurteiltMarkersClustered={
              store.map.beobNichtBeurteilt.markersClustered
            }
            beobNichtZuzuordnenMarkers={
              store.map.beobNichtZuzuordnen.markersClustered
            }
            beobNichtZuzuordnenHighlighted={store.map.beobNichtZuzuordnen.highlightedIds.join()}
            tpopBeobMarkers={store.map.tpopBeob.markers}
            tpopBeobHighlighted={store.map.tpopBeob.highlightedIds.join()}
            tpopBeobMarkersClustered={store.map.tpopBeob.markersClustered}
            tpopBeobAssigning={store.map.beob.assigning}
            tpopBeobAssignPolylines={store.map.tpopBeob.assignPolylines}
            tpopBeobAssignPolylinesLength={
              store.map.tpopBeob.assignPolylines.length
            }
            idOfTpopBeingLocalized={store.map.tpop.idOfTpopBeingLocalized}
            activeBaseLayer={store.map.activeBaseLayer}
            activeOverlays={store.map.activeOverlays}
            activeApfloraLayers={store.map.activeApfloraLayers}
            // SortedStrings enforce rerendering when sorting or visibility changes
            activeOverlaysSortedString={store.map.activeOverlaysSortedString}
            activeApfloraLayersSortedString={
              store.map.activeApfloraLayersSortedString
            }
          />
        </KarteContainer>
      </ReflexElement>,
    )
  }
  return children
}

const Projekte = ({ store }: { store: Object }) => {
  return (
    <Container loading={store.loading.length > 0}>
      <ReflexContainer orientation="vertical">
        {myChildren(store)}
      </ReflexContainer>
    </Container>
  )
}

export default enhance(Projekte)
