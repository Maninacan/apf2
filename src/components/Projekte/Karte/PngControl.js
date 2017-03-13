import React, { PropTypes } from 'react'
import 'leaflet'
import { observer, inject } from 'mobx-react'
import leafletImage from 'leaflet-image'
import fileSaver from 'file-saver'
import Control from 'react-leaflet-control'
import FontIcon from 'material-ui/FontIcon'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import getContext from 'recompose/getContext'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const StyledButton = styled.button`
  background-color: white;
  width: 47px;
  height: 47px;
  border-radius: 5px;
  border: 2px solid rgba(0,0,0,0.2);
  background-clip: padding-box;
  span {
    color: rgba(0, 0, 0, 0.54) !important;
  }
`

const theme = Object.assign({}, darkBaseTheme, {
  appBar: {
    height: 51,
  },
})

const enhance = compose(
  inject(`store`),
  getContext({ map: PropTypes.object.isRequired }),
  withHandlers({
    savePng: props => () => {
      const { map } = props
      leafletImage(map, function(error, canvas) {
        canvas.toBlob(function (blob) {
          fileSaver.saveAs(blob, 'map.png');
        })
      })
    },
  }),
  observer
)

const PngControl = ({ store, savePng }) =>
  <Control position="topright">
    <StyledButton
      onClick={savePng}
      title="Karte als png speichern"
    >
      <MuiThemeProvider
        muiTheme={getMuiTheme(theme)}
      >
        <FontIcon
          id="karteAlsPngSpeichern"
          className="material-icons"
        >
          file_download
        </FontIcon>
      </MuiThemeProvider>
    </StyledButton>
  </Control>

PngControl.propTypes = {
  store: PropTypes.object.isRequired,
  savePng: PropTypes.func.isRequired,
}

export default enhance(PngControl)
