import React, { PropTypes } from 'react'
import Control from 'react-leaflet-control'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'

const theme = Object.assign({}, darkBaseTheme, {
  appBar: {
    height: 51,
  },
})

const CardContainer = styled.div`
  background-color: rgb(48, 48, 48);
  border-radius: 5px;
  border: 2px solid rgba(0,0,0,0.2);
`
const Card = styled.div`
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 5px;
  padding-right: 5px;
  border: 1px solid rgba(0,0,0,0.2);
`
const CardHeader = styled.div``
const CardContent = styled.div`
  color: rgb(247, 247, 247);
`

const enhance = compose(
  inject(`store`),
  withState(`baseLayersExpanded`, `toggleBaseLayersExpanded`, false),
  withState(`overlaysExpanded`, `toggleOverlaysExpanded`, false),
  observer
)

const LayersControl = ({
  store,
  baseLayersExpanded,
  overlaysExpanded,
  toggleBaseLayersExpanded,
  toggleOverlaysExpanded,
}) => {
  return (
    <Control position="topright" >
      <MuiThemeProvider
        muiTheme={getMuiTheme(theme)}
      >
        <CardContainer>
          <Card>
            <CardHeader onClick={() => {
                console.log(`expand change`)
                toggleBaseLayersExpanded(!baseLayersExpanded)
              }}
            >
              Hintergrund
            </CardHeader>
            {
              baseLayersExpanded &&
              <CardContent>
                base layers
              </CardContent>
            }
          </Card>
          <Card>
            <CardHeader onClick={() => {
                console.log(`expand change`)
                toggleOverlaysExpanded(!overlaysExpanded)
              }}
            >
              Überlagerungen
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
}

export default enhance(LayersControl)
