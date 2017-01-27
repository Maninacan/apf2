import React, { PropTypes } from 'react'
import { ContextMenu, MenuItem } from 'react-contextmenu'

const BerFolder = ({ onClick }) =>
  <ContextMenu id="berFolder" >
    <div className="react-contextmenu-title">Bericht</div>
    <MenuItem
      onClick={onClick}
      data={{
        action: `insert`,
        table: `ber`,
      }}
    >
      neu
    </MenuItem>
  </ContextMenu>

BerFolder.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default BerFolder
