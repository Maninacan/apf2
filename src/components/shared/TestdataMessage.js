import React, { PropTypes } from 'react'
import { inject } from 'mobx-react'
import styled from 'styled-components'

const Div = styled.div`
  color: #00ff2f;
  padding: 10px 10px 0 10px;
`

const TestdataMessage = ({ store }) => {
  const { activeNodes } = store
  const isTestSpecies = (
    activeNodes.ap &&
    activeNodes.ap < 200
  )
  if (isTestSpecies) {
    return (
      <Div>
        Das ist eine Testart - Sie können alles ausprobieren!
      </Div>
    )
  }
  return null
}

TestdataMessage.propTypes = {
  store: PropTypes.object.isRequired,
}

export default inject(`store`)(TestdataMessage)
