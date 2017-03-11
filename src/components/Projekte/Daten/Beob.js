// @flow
import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import TextFieldNonUpdatable from '../../shared/TextFieldNonUpdatable'
import getBeobFromBeobBereitgestelltInActiveDataset from '../../../modules/getBeobFromBeobBereitgestelltInActiveDataset'

const enhance = compose(
  inject(`store`),
  observer
)

const Beob = ({ store }) => {
  const beob = getBeobFromBeobBereitgestelltInActiveDataset(store)
  if (!beob) return null

  const beobFields = Object.entries(beob)
    .filter(([key, value]) =>
      value || value === 0
    )
  return (
    <div>
      {
        beobFields.map(([key, value]) =>
          <div key={key}>
            <TextFieldNonUpdatable
              label={key}
              value={value}
            />
          </div>
        )
      }
    </div>
  )
}

Beob.propTypes = {
  store: PropTypes.object.isRequired,
}

export default enhance(Beob)