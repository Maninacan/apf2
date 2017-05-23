// @flow
import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const StyledLabel = styled.div`
  margin-top: 10px;
  cursor: text;
  font-size: 12px;
  color: rgba(0,0,0,0.5);
  pointer-events: none;
  user-select: none;
  padding-bottom: 8px;
`

const Label = ({ label }: { label: string }) => (
  <StyledLabel>
    {label}
  </StyledLabel>
)

export default observer(Label)
