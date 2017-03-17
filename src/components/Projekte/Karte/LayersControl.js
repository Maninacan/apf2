import React, { PropTypes } from 'react'
import Control from 'react-leaflet-control'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import FontIcon from 'material-ui/FontIcon'

const theme = Object.assign({}, baseTheme)

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
const CardTitle = styled.div`
  padding-right: 5px;
`
const CardContent = styled.div`
  color: rgb(48, 48, 48);
  padding-left: 5px;
  padding-right: 5px;
`
const StyledFontIcon = styled(FontIcon)`
  font-size: 18px !important;
  color: rgb(48, 48, 48) !important;
`
const DragHandle = styled(FontIcon)`
  font-size: 18px !important;
  color: rgb(48, 48, 48) !important;
  cursor: grab;
`
const LayerDiv = styled.div`
  border-bottom: 1px solid #ececec;
  display: flex;
  justify-content: space-between;
  padding-top: 4px;
`
const Input = styled.input`
  /*vertical-align: -2px;*/
`
const Label = styled.label`
  padding-right: 4px;
  user-select: none;
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
    onCheckOverlay: props => (event, isChecked) => {
      console.log(`event:`, event)
      console.log(`isChequed:`, isChecked)
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
  onCheckOverlay,
}) => {
  const baseLayers = [
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
  ]
  const activeOverlays = toJS(store.map.activeOverlays)

  return (
    <Control position="topright">
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <CardContainer>
          <Card>
            <CardHeader onClick={onToggleBaseLayersExpanded}>
              <CardTitle>Hintergrund</CardTitle>
              <div>
                <StyledFontIcon className="material-icons">
                  expand_more
                </StyledFontIcon>
              </div>
            </CardHeader>
            {
              baseLayersExpanded &&
              <CardContent>
                {
                  baseLayers.map((l, index) =>
                    <div key={index}>
                      <Label>
                        <Input
                          type="radio"
                          name="baseLayers"
                          value={l.value}
                          checked={store.map.activeBaseLayer === l.value}
                          onChange={() => store.map.setActiveBaseLayer(l.value)}
                        />
                        {l.label}
                      </Label>
                    </div>
                  )
                }
              </CardContent>
            }
          </Card>
          <Card>
            <CardHeader onClick={onToggleOverlaysExpanded}>
              <CardTitle>überlagernd</CardTitle>
              <div>
                <StyledFontIcon className="material-icons">
                  expand_more
                </StyledFontIcon>
              </div>
            </CardHeader>
            {
              overlaysExpanded &&
              <CardContent>
                {
                  store.map.overlays.map((o, index) =>
                    <LayerDiv key={index}>
                      <Label>
                        <Input
                          type="checkbox"
                          value={o.value}
                          checked={activeOverlays.includes(o.value)}
                          onChange={() => {
                            if (activeOverlays.includes(o.value)) {
                              return store.map.removeActiveOverlay(o.value)
                            }
                            return store.map.addActiveOverlay(o.value)
                          }}
                        />
                        {o.label}
                      </Label>
                      <div>
                        <DragHandle className="material-icons">
                          drag_handle
                        </DragHandle>
                      </div>
                    </LayerDiv>
                  )
                }
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
  onCheckOverlay: PropTypes.func.isRequired,
}

export default enhance(LayersControl)
