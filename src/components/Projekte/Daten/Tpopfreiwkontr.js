// @flow
import React from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import compose from 'recompose/compose'

import RadioButton from '../../shared/RadioButton'
import TextField from '../../shared/TextField'
import SelectField from '../../shared/SelectField'
import StringToCopy from '../../shared/StringToCopy'
import FormTitle from '../../shared/FormTitle'
import YearDatePair from '../../shared/YearDatePair'
import constants from '../../../modules/constants'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const FieldsContainer = styled.div`
  padding: 10px;
  overflow: auto !important;
  column-width: ${constants.columnWidth}px;
`

const enhance = compose(inject('store'), observer)

const Tpopfreiwkontr = ({ store, tree }: { store: Object, tree: Object }) => {
  const { activeDataset } = tree

  return (
    <Container>
      <FormTitle tree={tree} title="Freiwilligen-Kontrolle" />
      <FieldsContainer>
        <YearDatePair
          tree={tree}
          yearLabel="Jahr"
          yearFieldName="TPopKontrJahr"
          yearValue={activeDataset.row.TPopKontrJahr}
          yearErrorText={activeDataset.valid.TPopKontrJahr}
          dateLabel="Datum"
          dateFieldName="TPopKontrDatum"
          dateValue={activeDataset.row.TPopKontrDatum}
          dateErrorText={activeDataset.valid.TPopKontrDatum}
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <SelectField
          tree={tree}
          label="BearbeiterIn"
          fieldName="TPopKontrBearb"
          value={activeDataset.row.TPopKontrBearb}
          errorText={activeDataset.valid.TPopKontrBearb}
          dataSource={store.dropdownList.adressen}
          valueProp="AdrId"
          labelProp="AdrName"
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <RadioButton
          tree={tree}
          fieldName="TPopKontrPlan"
          label="Auf Plan eingezeichnet"
          value={activeDataset.row.TPopKontrPlan}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          tree={tree}
          label="Überprüfte Fläche in m2"
          fieldName="TPopKontrUebFlaeche"
          value={activeDataset.row.TPopKontrUebFlaeche}
          errorText={activeDataset.valid.TPopKontrUebFlaeche}
          type="number"
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          tree={tree}
          label="Deckung überprüfte Art (%)"
          fieldName="TPopKontrUebPfl"
          value={activeDataset.row.TPopKontrUebPfl}
          errorText={activeDataset.valid.TPopKontrUebPfl}
          type="number"
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          tree={tree}
          label="Deckung nackter Boden (%)"
          fieldName="TPopKontrNaBo"
          value={activeDataset.row.TPopKontrNaBo}
          errorText={activeDataset.valid.TPopKontrNaBo}
          type="number"
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <RadioButton
          tree={tree}
          fieldName="TPopKontrJungPflJN"
          label="Auch junge Pflanzen vorhanden"
          value={activeDataset.row.TPopKontrJungPflJN}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          tree={tree}
          label="Maximum der Vegetationshöhe in cm"
          fieldName="TPopKontrVegHoeMax"
          value={activeDataset.row.TPopKontrVegHoeMax}
          errorText={activeDataset.valid.TPopKontrVegHoeMax}
          type="number"
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          tree={tree}
          label="Mittelwert der Vegetationshöhe in cm"
          fieldName="TPopKontrVegHoeMit"
          value={activeDataset.row.TPopKontrVegHoeMit}
          errorText={activeDataset.valid.TPopKontrVegHoeMit}
          type="number"
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          tree={tree}
          label="Gefährdung"
          fieldName="TPopKontrGefaehrdung"
          value={activeDataset.row.TPopKontrGefaehrdung}
          errorText={activeDataset.valid.TPopKontrGefaehrdung}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          tree={tree}
          label="Bemerkungen"
          fieldName="TPopKontrTxt"
          value={activeDataset.row.TPopKontrTxt}
          errorText={activeDataset.valid.TPopKontrTxt}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <StringToCopy text={activeDataset.row.TPopKontrGuid} label="GUID" />
      </FieldsContainer>
    </Container>
  )
}

export default enhance(Tpopfreiwkontr)
