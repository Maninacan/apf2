// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import compose from 'recompose/compose'

import TextField from '../../shared/TextField'
import FormTitle from '../../shared/FormTitle'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const FieldsContainer = styled.div`
  padding: 10px;
  overflow: auto !important;
`

const enhance = compose(inject('store'), observer)

const Zielber = ({ store, tree }: { store: Object, tree: Object }) => {
  const { activeDataset } = tree

  return (
    <Container>
      <FormTitle tree={tree} title="Ziel-Bericht" />
      <FieldsContainer>
        <TextField
          tree={tree}
          label="Jahr"
          fieldName="ZielBerJahr"
          value={activeDataset.row.ZielBerJahr}
          errorText={activeDataset.valid.ZielBerJahr}
          type="number"
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          tree={tree}
          label="Entwicklung"
          fieldName="ZielBerErreichung"
          value={activeDataset.row.ZielBerErreichung}
          errorText={activeDataset.valid.ZielBerErreichung}
          type="text"
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          tree={tree}
          label="Bemerkungen"
          fieldName="ZielBerTxt"
          value={activeDataset.row.ZielBerTxt}
          errorText={activeDataset.valid.ZielBerTxt}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
      </FieldsContainer>
    </Container>
  )
}

export default enhance(Zielber)
