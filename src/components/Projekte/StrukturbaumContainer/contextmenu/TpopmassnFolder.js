import React, { PropTypes } from 'react'
import { ContextMenu, MenuItem } from 'react-contextmenu'

const TpopmassnFolder = ({ onClick }) =>
  <ContextMenu id="tpopmassnFolder" >
    <div className="react-contextmenu-title">Massnahmen</div>
    <MenuItem
      onClick={onClick}
      data={{
        action: `insert`,
        table: `tpopmassn`,
      }}
    >
      neu
    </MenuItem>
  </ContextMenu>

TpopmassnFolder.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default TpopmassnFolder
