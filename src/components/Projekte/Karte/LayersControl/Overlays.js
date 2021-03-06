import React from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import FontIcon from 'material-ui/FontIcon'
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'

import Checkbox from './shared/Checkbox'

const CardContent = styled.div`
  color: rgb(48, 48, 48);
  padding-left: 5px;
  padding-right: 5px;
`
const DragHandleIcon = styled(FontIcon)`
  font-size: 18px !important;
  color: #7b7b7b !important;
  cursor: grab;
`
const LegendIcon = styled(FontIcon)`
  font-size: 18px !important;
  color: #7b7b7b !important;
  cursor: pointer;
`
const LayerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 4px;
  &:not(:last-of-type) {
    border-bottom: 1px solid #ececec;
  }
  /*
   * z-index is needed because leaflet
   * sets high one for controls
   */
  z-index: 2000;
  /*
   * font-size is lost while moving a layer
   * because it is inherited from higher up
   */
  font-size: 12px;
`
const IconsDivs = styled.div`
  display: flex;
`
const IconsDiv = styled.div`
  display: flex;
`
// TODO: add icon: https://material.io/icons/#ic_info
// for layers with legend
const layerLegends = {
  ZhSvoColor: 'http://wms.zh.ch/FnsSVOZHWMS?version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=zonen-schutzverordnungen&format=image/png&STYLE=default',
  ZhPflegeplan: 'http://wms.zh.ch/FnsPflegeZHWMS?version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=pfpl&format=image/png&STYLE=default',
}
/**
 * don't know why but passing store
 * with mobx inject does not work here
 * so passed in from parent
 */

const DragHandle = SortableHandle(() => (
  <DragHandleIcon
    className="material-icons"
    title="ziehen, um Layer höher/tiefer zu stapeln"
  >
    drag_handle
  </DragHandleIcon>
))

const SortableItem = SortableElement(({ overlay, store, activeOverlays }) => (
  <LayerDiv>
    <Checkbox
      tree={store.tree}
      value={overlay.value}
      label={overlay.label}
      checked={activeOverlays.includes(overlay.value)}
      onChange={() => {
        if (activeOverlays.includes(overlay.value)) {
          return store.map.removeActiveOverlay(overlay.value)
        }
        return store.map.addActiveOverlay(overlay.value)
      }}
    />
    <IconsDivs>
      {!!layerLegends[overlay.value] &&
        <IconsDiv>
          <div>
            <LegendIcon
              className="material-icons"
              title="Legende öffnen"
              onClick={() => {
                window.open(layerLegends[overlay.value])
              }}
            >
              info_outline
            </LegendIcon>
          </div>
        </IconsDiv>}
      <IconsDiv>
        <div>
          <DragHandle />
        </div>
      </IconsDiv>
    </IconsDivs>
  </LayerDiv>
))

const SortableList = SortableContainer(({ items, store, activeOverlays }) => (
  <div>
    {items.map((overlay, index) => (
      <SortableItem
        key={index}
        index={index}
        overlay={overlay}
        store={store}
        activeOverlays={activeOverlays}
      />
    ))}
  </div>
))

const enhance = compose(
  withHandlers({
    onSortEnd: props => ({ oldIndex, newIndex }) =>
      props.store.map.moveOverlay({ oldIndex, newIndex }),
  }),
  observer,
)

const Overlays = ({
  store,
  onSortEnd,
}: {
  store: Object,
  onSortEnd: () => void,
}) => (
  <CardContent>
    <SortableList
      items={store.map.overlays}
      onSortEnd={onSortEnd}
      useDragHandle
      lockAxis="y"
      store={store}
      activeOverlays={toJS(store.map.activeOverlays)}
    />
  </CardContent>
)

export default enhance(Overlays)
