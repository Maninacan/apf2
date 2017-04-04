// @flow
import React, { PropTypes } from 'react'
import { ContextMenu, MenuItem } from 'react-contextmenu'

const TpopfeldkontrFolder = (
  { onClick, treeName }:
  {onClick:()=>void,treeName:string}
) =>
  <ContextMenu id={treeName} >
    <div className="react-contextmenu-title">Feld-Kontrollen</div>
    <MenuItem
      onClick={onClick}
      data={{
        action: `insert`,
        table: `tpopfeldkontr`,
      }}
    >
      erstelle neue
    </MenuItem>
  </ContextMenu>

TpopfeldkontrFolder.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default TpopfeldkontrFolder
