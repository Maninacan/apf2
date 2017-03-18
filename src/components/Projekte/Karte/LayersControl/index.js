import React, { PropTypes } from 'react'
import Control from 'react-leaflet-control'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import FontIcon from 'material-ui/FontIcon'

import Overlays from './Overlays'
import BaseLayers from './BaseLayers'

const theme = Object.assign({}, baseTheme)

const CardContainer = styled.div`
  background-color: white;
  background-clip: padding-box;
  border-radius: 5px;
  border: 2px solid rgba(0,0,0,0.2);
`
const Card = styled.div`
  padding-top: 3px;
  color: rgb(48, 48, 48);
  &:not(:first-of-type) {
    border-top: 1px solid rgba(0,0,0,0.2);
  }
  /*
  &:not(:last-of-type) {
    border-bottom: 1px solid rgba(0,0,0,0.2);
  }*/
`
const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 7px;
  padding-right: 5px;
  border-bottom: 1px solid rgba(0,0,0,0.2);
  cursor: pointer;
  font-weight: bold;
`
const CardTitle = styled.div`
  padding-right: 5px;
`
const StyledFontIcon = styled(FontIcon)`
  font-size: 18px !important;
  color: rgb(48, 48, 48) !important;
`

const enhance = compose(
  inject(`store`),
  withState(`baseLayersExpanded`, `toggleBaseLayersExpanded`, false),
  withState(`overlaysExpanded`, `toggleOverlaysExpanded`, false),
  withHandlers({
    onToggleBaseLayersExpanded: props => () => {
      const {
        overlaysExpanded,
        baseLayersExpanded,
        toggleOverlaysExpanded,
        toggleBaseLayersExpanded,
      } = props
      toggleBaseLayersExpanded(!baseLayersExpanded)
      if (overlaysExpanded) {
        toggleOverlaysExpanded(!overlaysExpanded)
      }
    },
    onToggleOverlaysExpanded: props => () => {
      const {
        overlaysExpanded,
        baseLayersExpanded,
        toggleOverlaysExpanded,
        toggleBaseLayersExpanded,
      } = props
      toggleOverlaysExpanded(!overlaysExpanded)
      if (baseLayersExpanded) {
        toggleBaseLayersExpanded(!baseLayersExpanded)
      }
    },
  }),
  observer
)

const LayersControl = ({
  store,
  baseLayersExpanded,
  overlaysExpanded,
  onToggleBaseLayersExpanded,
  onToggleOverlaysExpanded,
}) => {
  return (
    <Control position="topright">
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <CardContainer>
          <Card>
            <CardHeader onClick={onToggleBaseLayersExpanded}>
              <CardTitle>Hintergrund-Ebene</CardTitle>
              <div>
                <StyledFontIcon className="material-icons">
                  { baseLayersExpanded ? `expand_less` : `expand_more` }
                </StyledFontIcon>
              </div>
            </CardHeader>
            {
              baseLayersExpanded &&
              <BaseLayers store={store} />
            }
          </Card>
          <Card>
            <CardHeader onClick={onToggleOverlaysExpanded}>
              <CardTitle>überlagernde Ebenen</CardTitle>
              <div>
                <StyledFontIcon className="material-icons">
                  { overlaysExpanded ? `expand_less` : `expand_more` }
                </StyledFontIcon>
              </div>
            </CardHeader>
            {
              overlaysExpanded &&
              <Overlays
                store={store}
                /**
                 * overlaysString enforces rererender
                 * even when only the sorting changes
                 */
                overlaysString={store.map.overlaysString}
                assigning={store.map.beob.assigning}
              />
            }
          </Card>
        </CardContainer>
      </MuiThemeProvider>
    </Control>
  )
}

LayersControl.propTypes = {
  store: PropTypes.object.isRequired,
  baseLayersExpanded: PropTypes.bool.isRequired,
  overlaysExpanded: PropTypes.bool.isRequired,
  toggleBaseLayersExpanded: PropTypes.func.isRequired,
  toggleOverlaysExpanded: PropTypes.func.isRequired,
  onToggleBaseLayersExpanded: PropTypes.func.isRequired,
  onToggleOverlaysExpanded: PropTypes.func.isRequired,
}

export default enhance(LayersControl)
