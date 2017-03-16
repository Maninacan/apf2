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

import RadioButtonGroup from '../../shared/RadioButtonGroup'

const theme = Object.assign({}, baseTheme, {
  appBar: {
    height: 51,
  },
})

const CardContainer = styled.div`
  background-color: white;
  background-clip: padding-box;
  border-radius: 5px;
  border: 2px solid rgba(0,0,0,0.2);
`
const Card = styled.div`
  padding-top: 3px;
  border: 1px solid rgba(0,0,0,0.2);
  color: rgb(48, 48, 48);
`
const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom: 1px solid rgba(0,0,0,0.2);
  cursor: pointer;
  font-weight: bold;
`
const CardContent = styled.div`
  color: rgb(48, 48, 48);
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 3px;
  padding-bottom: 3px;
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
      const { baseLayersExpanded, toggleBaseLayersExpanded } = props
      toggleBaseLayersExpanded(!baseLayersExpanded)
    },
    onToggleOverlaysExpanded: props => () => {
      const { overlaysExpanded, toggleOverlaysExpanded } = props
      toggleOverlaysExpanded(!overlaysExpanded)
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
    <Control position="topright" >
      <MuiThemeProvider
        muiTheme={getMuiTheme(theme)}
      >
        <CardContainer>
          <Card>
            <CardHeader onClick={onToggleBaseLayersExpanded}
            >
              <div>Hintergrund</div>
              <div>
                <StyledFontIcon className="material-icons">
                  expand_more
                </StyledFontIcon>
              </div>
            </CardHeader>
            {
              baseLayersExpanded &&
              <CardContent>
                <RadioButtonGroup
                  fieldName="activeBaseLayer"
                  value={store.map.activeBaseLayer}
                  dataSource={[
                    { label: `OpenStreetMap farbig`, value: `OsmColor` },
                    { label: `OpenStreetMap grau`, value: `OsmBw` },
                    { label: `Swisstopo farbig`, value: `SwissTopoPixelFarbe` },
                    { label: `Swisstopo grau`, value: `SwissTopoPixelGrau` },
                    { label: `ZH Übersichtsplan`, value: `ZhUep` },
                    { label: `Bing Luftbild`, value: `BingAerial` },
                    { label: `ZH Orthofoto Sommer RGB`, value: `ZhOrtho` },
                    { label: `ZH Orthofoto Sommer infrarot`, value: `ZhOrthoIr` },
                    { label: `ZH Orthofoto Frühjahr 2015/16 RGB`, value: `ZhOrtho2015` },
                    { label: `ZH Orthofoto Frühjahr 2015/16 infrarot`, value: `ZhOrtho2015Ir` },
                  ]}
                  updatePropertyInDb={(a, layer) => {
                    store.map.setActiveBaseLayer(layer)
                  }}
                />
              </CardContent>
            }
          </Card>
          <Card>
            <CardHeader onClick={onToggleOverlaysExpanded}
            >
              <div>überlagernd</div>
              <div>
                <StyledFontIcon className="material-icons">
                  expand_more
                </StyledFontIcon>
              </div>
            </CardHeader>
            {
              overlaysExpanded &&
              <CardContent>
                overlayed layers
              </CardContent>
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
