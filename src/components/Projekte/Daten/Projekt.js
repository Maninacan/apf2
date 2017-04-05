// @flow
import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import compose from 'recompose/compose'
import { Scrollbars } from 'react-custom-scrollbars'

import TextField from '../../shared/TextField'
import FormTitle from '../../shared/FormTitle'

const Container = styled.div`
  height: 100%;
`
const FieldsContainer = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 45px;
`

const enhance = compose(
  inject(`store`),
  observer
)

const Projekt = ({
  store,
}) => {
  const { activeDataset } = store.tree
  return (
    <Container>
      <FormTitle title="Projekt" />
      <Scrollbars>
        <FieldsContainer>
          <TextField
            label="Name"
            fieldName="ProjName"
            value={
              (activeDataset && activeDataset.row && activeDataset.row.ProjName) ?
              activeDataset.row.ProjName :
              ``
            }
            errorText={
              (activeDataset && activeDataset.valid && activeDataset.valid.ProjName) ?
              activeDataset.valid.ProjName :
              ``
            }
            type="text"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
        </FieldsContainer>
      </Scrollbars>
    </Container>
  )
}

Projekt.propTypes = {
  store: PropTypes.object.isRequired,
}

export default enhance(Projekt)
