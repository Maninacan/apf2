// @flow

export default [
  {
    database: 'apflora',
    table: 'ap',
    label: 'Arten',
    labelSingular: 'Art',
    idField: 'ApArtId',
    parentIdField: 'ProjId',
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'pop',
    label: 'Populationen',
    labelSingular: 'Population',
    idField: 'PopId',
    parentIdField: 'ApArtId',
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'tpop',
    label: 'Teil-Populationen',
    labelSingular: 'Teil-Population',
    idField: 'TPopId',
    parentIdField: 'PopId',
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'tpopkontr',
    label: 'Kontrollen',
    labelSingular: 'Kontrolle',
    idField: 'TPopKontrId',
    parentIdField: 'TPopId',
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'tpopfeldkontr',
    dbTable: 'tpopkontr',
    label: 'Feld-Kontrollen',
    labelSingular: 'Feld-Kontrolle',
    idField: 'TPopKontrId',
    parentIdField: 'TPopId',
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'tpopfreiwkontr',
    dbTable: 'tpopkontr',
    label: 'Freiwilligen-Kontrollen',
    labelSingular: 'Freiwilligen-Kontrolle',
    idField: 'TPopKontrId',
    parentIdField: 'TPopId',
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'tpopkontrzaehl_einheit_werte',
    idField: 'ZaehleinheitCode',
    stammdaten: true,
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'tpopkontrzaehl_methode_werte',
    idField: 'BeurteilCode',
    stammdaten: true,
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'tpopkontrzaehl',
    label: 'Zählungen',
    labelSingular: 'Zählung',
    idField: 'TPopKontrZaehlId',
    parentIdField: 'TPopKontrId',
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'tpopfreiwkontrzaehl',
    dbTable: 'tpopkontrzaehl',
    label: 'Zählungen',
    labelSingular: 'Zählung',
    idField: 'TPopKontrZaehlId',
    parentIdField: 'TPopKontrId',
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'tpopfeldkontrzaehl',
    dbTable: 'tpopkontrzaehl',
    label: 'Zählungen',
    labelSingular: 'Zählung',
    idField: 'TPopKontrZaehlId',
    parentIdField: 'TPopKontrId',
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'tpopmassn',
    label: 'Massnahmen',
    labelSingular: 'Massnahme',
    idField: 'TPopMassnId',
    parentIdField: 'TPopId',
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'tpopmassn_typ_werte',
    idField: 'MassnTypCode',
    stammdaten: true,
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'popmassn_erfbeurt_werte',
    idField: 'BeurteilId',
    stammdaten: true,
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'tpopmassn_erfbeurt_werte',
    idField: 'BeurteilId',
    stammdaten: true,
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'ziel',
    label: 'AP-Ziele',
    labelSingular: 'AP-Ziel',
    idField: 'ZielId',
    parentIdField: 'ApArtId',
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'ziel_typ_werte',
    idField: 'ZieltypId',
    stammdaten: true,
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'zielber',
    label: 'Berichte',
    labelSingular: 'Bericht',
    idField: 'ZielBerId',
    parentIdField: 'ZielId',
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'erfkrit',
    label: 'AP-Erfolgskriterien',
    labelSingular: 'AP-Erfolgskriterium',
    idField: 'ErfkritId',
    parentIdField: 'ApArtId',
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'apber',
    label: 'AP-Berichte',
    labelSingular: 'AP-Bericht',
    idField: 'JBerId',
    parentIdField: 'ApArtId',
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'apberuebersicht',
    label: 'AP-Berichte',
    labelSingular: 'AP-Bericht',
    idField: 'JbuJahr',
    parentIdField: 'ProjId',
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'ber',
    label: 'Berichte',
    labelSingular: 'Bericht',
    idField: 'BerId',
    parentIdField: 'ApArtId',
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'idealbiotop',
    label: 'Idealbiotop',
    labelSingular: 'Idealbiotop',
    idField: 'IbApArtId',
    parentIdField: 'IbApArtId',
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'assozart',
    label: 'assoziierte Arten',
    labelSingular: 'assoziierte Art',
    idField: 'AaId',
    parentIdField: 'AaApArtId',
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'popber',
    label: 'Kontroll-Berichte',
    labelSingular: 'Kontroll-Bericht',
    idField: 'PopBerId',
    parentIdField: 'PopId',
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'popmassnber',
    label: 'Massnahmen-Berichte',
    labelSingular: 'Massnahmen-Bericht',
    idField: 'PopMassnBerId',
    parentIdField: 'PopId',
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'tpopber',
    label: 'Kontroll-Berichte',
    labelSingular: 'Kontroll-Bericht',
    idField: 'TPopBerId',
    parentIdField: 'TPopId',
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'tpopmassnber',
    label: 'Massnahmen-Berichte',
    labelSingular: 'Massnahmen-Bericht',
    idField: 'TPopMassnBerId',
    parentIdField: 'TPopId',
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'beobzuordnung',
    idField: 'BeobId',
    parentIdField: 'TPopId',
    mutWannField: 'BeobMutWann',
    mutWerField: 'BeobMutWer'
  },
  {
    database: 'apflora',
    table: 'beobzuordnung',
    idField: 'BeobId',
    parentIdField: 'ArtId',
    mutWannField: 'BeobMutWann',
    mutWerField: 'BeobMutWer'
  },
  {
    database: 'apflora',
    table: 'beobzuordnung',
    idField: 'BeobId',
    parentIdField: 'ArtId',
    mutWannField: 'BeobMutWann',
    mutWerField: 'BeobMutWer'
  },
  {
    database: 'apflora',
    table: 'projekt',
    label: 'Projekte',
    labelSingular: 'Projekt',
    idField: 'ProjId',
    mutWannField: 'MutWann',
    mutWerField: 'MutWer'
  },
  {
    database: 'beob',
    table: 'beob',
    idField: 'id',
    parentIdField: 'ArtId'
  },
  {
    database: 'beob',
    table: 'adb_eigenschaften',
    idField: 'TaxonomieId',
    stammdaten: true,
    mutWannField: null,
    mitWerField: null
  },
  {
    database: 'apflora',
    table: 'ap_bearbstand_werte',
    idField: 'DomainCode',
    stammdaten: true,
    mutWannField: 'MutWann',
    mitWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'ap_umsetzung_werte',
    idField: 'DomainCode',
    stammdaten: true,
    mutWannField: 'MutWann',
    mitWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'adresse',
    idField: 'AdrId',
    stammdaten: true,
    mutWannField: 'MutWann',
    mitWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'ap_erfkrit_werte',
    idField: 'BeurteilId',
    stammdaten: true,
    mutWannField: 'MutWann',
    mitWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'pop_entwicklung_werte',
    idField: 'EntwicklungId',
    stammdaten: true,
    mutWannField: 'MutWann',
    mitWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'pop_status_werte',
    idField: 'HerkunftId',
    stammdaten: true,
    mutWannField: 'MutWann',
    mitWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'tpop_apberrelevant_werte',
    idField: 'DomainCode',
    stammdaten: true,
    mutWannField: 'MutWann',
    mitWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'gemeinde',
    idField: 'BfsNr',
    stammdaten: true,
    mutWannField: 'MutWann',
    mitWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'tpop_entwicklung_werte',
    idField: 'EntwicklungCode',
    stammdaten: true,
    mutWannField: 'MutWann',
    mitWerField: 'MutWer'
  },
  {
    database: 'apflora',
    table: 'tpopkontr_idbiotuebereinst_werte',
    idField: 'DomainCode',
    stammdaten: true,
    mutWannField: 'MutWann',
    mitWerField: 'MutWer'
  },
  {
    database: 'beob',
    table: 'beob_quelle',
    idField: 'id',
    stammdaten: true
  },
  {
    database: 'beob',
    table: 'adb_lr',
    idField: 'id',
    stammdaten: true
  }
]
