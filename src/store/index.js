// @flow
import {
  extendObservable,
  action,
  autorun,
  autorunAsync,
  computed,
  observable,
} from 'mobx'
import $ from 'jquery'
import sortBy from 'lodash/sortBy'

import fetchTable from '../modules/fetchTable'
import fetchBeobzuordnungModule from '../modules/fetchBeobzuordnung'
import fetchTableByParentId from '../modules/fetchTableByParentId'
import fetchTpopForAp from '../modules/fetchTpopForAp'
import fetchPopForAp from '../modules/fetchPopForAp'
import fetchDatasetById from '../modules/fetchDatasetById'
import fetchBeobBereitgestellt from '../modules/fetchBeobBereitgestellt'
import fetchBeobEvab from '../modules/fetchBeobEvab'
import fetchBeobInfospezies from '../modules/fetchBeobInfospezies'
import updateActiveDatasetFromUrl from '../modules/updateActiveDatasetFromUrl'
import getActiveUrlElements from '../modules/getActiveUrlElements'
import fetchDataForActiveUrlElements from '../modules/fetchDataForActiveUrlElements'
import buildProjektNodes from '../modules/nodes/projekt'
import updateProperty from '../modules/updateProperty'
import updatePropertyInDb from '../modules/updatePropertyInDb'
import manipulateUrl from '../modules/manipulateUrl'
import getUrl from '../modules/getUrl'
import getUrlQuery from '../modules/getUrlQuery'
import fetchFields from '../modules/fetchFields'
import fetchFieldsFromIdb from '../modules/fetchFieldsFromIdb'
import insertDataset from '../modules/insertDataset'
import insertBeobzuordnung from '../modules/insertBeobzuordnung'
import deleteDatasetDemand from '../modules/deleteDatasetDemand'
import deleteDatasetExecute from '../modules/deleteDatasetExecute'
import toggleNode from '../modules/toggleNode'
import listError from '../modules/listError'
import setUrlQuery from '../modules/setUrlQuery'
import setQk from '../modules/setQk'
import setQkFilter from '../modules/setQkFilter'
import fetchQk from '../modules/fetchQk'
import addMessagesToQk from '../modules/addMessagesToQk'
import getPopsForMap from '../modules/getPopsForMap'
import getTpopsForMap from '../modules/getTpopsForMap'
import getBeobForMap from '../modules/getBeobForMap'
import getPopBounds from '../modules/getPopBounds'
import getTpopBounds from '../modules/getTpopBounds'
import getTpopBeobBounds from '../modules/getTpopBeobBounds'
import getBeobNichtZuzuordnenBounds from '../modules/getBeobNichtZuzuordnenBounds'
import getBeobNichtBeurteiltBounds from '../modules/getBeobNichtBeurteiltBounds'
import epsg4326to21781 from '../modules/epsg4326to21781'
import getPopMarkers from '../modules/getPopMarkers'
import getTpopMarkers from '../modules/getTpopMarkers'
import getTpopMarkersClustered from '../modules/getTpopMarkersClustered'
import getBeobMarkersClustered from '../modules/getBeobMarkersClustered'
import getBeobMarkers from '../modules/getBeobMarkers'
import getBeobNichtBeurteiltMarkersClustered from '../modules/getBeobNichtBeurteiltMarkersClustered'
import getBeobNichtBeurteiltMarkers from '../modules/getBeobNichtBeurteiltMarkers'
import getBeobNichtZuzuordnenMarkersClustered from '../modules/getBeobNichtZuzuordnenMarkersClustered'
import getTpopBeobMarkersClustered from '../modules/getTpopBeobMarkersClustered'
import getTpopBeobMarkers from '../modules/getTpopBeobMarkers'
import getTpopBeobAssignPolylines from '../modules/getTpopBeobAssignPolylines'
import fetchLogin from '../modules/fetchLogin'
import logout from '../modules/logout'
import setLoginFromIdb from '../modules/setLoginFromIdb'
import localizeTpop from '../modules/localizeTpop'
import fetchStammdatenTables from '../modules/fetchStammdatenTables'
import projektNodes from '../modules/nodes/projekt'
import apFolderNodes from '../modules/nodes/apFolder'
import apberuebersichtFolderNodes from '../modules/nodes/apberuebersichtFolder'
import apberuebersichtNodes from '../modules/nodes/apberuebersicht'
import exporteFolderNodes from '../modules/nodes/exporteFolder'
import apNodes from '../modules/nodes/ap'
import allNodes from '../modules/nodes/allNodes'
import qkFolderNode from '../modules/nodes/qkFolder'
import assozartFolderNode from '../modules/nodes/assozartFolder'
import assozartNode from '../modules/nodes/assozart'
import idealbiotopFolderNode from '../modules/nodes/idealbiotopFolder'
import beobNichtZuzuordnenFolderNode from '../modules/nodes/beobNichtZuzuordnenFolder'
import beobNichtZuzuordnenNode from '../modules/nodes/beobNichtZuzuordnen'
import beobzuordnungFolderNode from '../modules/nodes/beobzuordnungFolder'
import beobzuordnungNode from '../modules/nodes/beobzuordnung'
import berFolderNode from '../modules/nodes/berFolder'
import berNode from '../modules/nodes/ber'
import apberFolderNode from '../modules/nodes/apberFolder'
import apberNode from '../modules/nodes/apber'
import erfkritFolderNode from '../modules/nodes/erfkritFolder'
import erfkritNode from '../modules/nodes/erfkrit'
import zieljahreFolderNode from '../modules/nodes/zieljahrFolder'
import zieljahrNode from '../modules/nodes/zieljahr'
import zielNode from '../modules/nodes/ziel'
import zielberFolderNode from '../modules/nodes/zielberFolder'
import zielberNode from '../modules/nodes/zielber'
import popFolderNode from '../modules/nodes/popFolder'
import popNode from '../modules/nodes/pop'
import popmassnberFolderNode from '../modules/nodes/popmassnberFolder'
import popmassnberNode from '../modules/nodes/popmassnber'
import popberFolderNode from '../modules/nodes/popberFolder'
import popberNode from '../modules/nodes/popber'
import tpopFolderNode from '../modules/nodes/tpopFolder'
import tpopNode from '../modules/nodes/tpop'
import tpopbeobFolderNode from '../modules/nodes/tpopbeobFolder'
import tpopbeobNode from '../modules/nodes/tpopbeob'
import tpopberFolderNode from '../modules/nodes/tpopberFolder'
import tpopberNode from '../modules/nodes/tpopber'
import tpopfreiwkontrFolderNode from '../modules/nodes/tpopfreiwkontrFolder'
import tpopfreiwkontrNode from '../modules/nodes/tpopfreiwkontr'
import tpopfreiwkontrzaehlFolderNode from '../modules/nodes/tpopfreiwkontrzaehlFolder'
import tpopfreiwkontrzaehlNode from '../modules/nodes/tpopfreiwkontrzaehl'
import tpopfeldkontrFolderNode from '../modules/nodes/tpopfeldkontrFolder'
import tpopfeldkontrNode from '../modules/nodes/tpopfeldkontr'
import tpopfeldkontrzaehlFolderNode from '../modules/nodes/tpopfeldkontrzaehlFolder'
import tpopfeldkontrzaehlNode from '../modules/nodes/tpopfeldkontrzaehl'
import tpopmassnberFolderNode from '../modules/nodes/tpopmassnberFolder'
import tpopmassnberNode from '../modules/nodes/tpopmassnber'
import tpopmassnFolderNode from '../modules/nodes/tpopmassnFolder'
import tpopmassnNode from '../modules/nodes/tpopmassn'
import filteredAndSortedProjekt from './table/filteredAndSorted/projekt'
import filteredAndSortedApberuebersicht from './table/filteredAndSorted/apberuebersicht'
import filteredAndSortedAp from './table/filteredAndSorted/ap'
import filteredAndSortedAssozart from './table/filteredAndSorted/assozart'
import filteredAndSortedIdealbiotop from './table/filteredAndSorted/idealbiotop'
import filteredAndSortedBeobNichtZuzuordnen from './table/filteredAndSorted/beobNichtZuzuordnen'
import filteredAndSortedBeobzuordnung from './table/filteredAndSorted/beobzuordnung'
import filteredAndSortedBer from './table/filteredAndSorted/ber'
import filteredAndSortedApber from './table/filteredAndSorted/apber'
import filteredAndSortedErfkrit from './table/filteredAndSorted/erfkrit'
import filteredAndSortedZieljahr from './table/filteredAndSorted/zieljahr'
import filteredAndSortedZiel from './table/filteredAndSorted/ziel'
import filteredAndSortedZielber from './table/filteredAndSorted/zielber'
import filteredAndSortedPop from './table/filteredAndSorted/pop'
import filteredAndSortedPopmassnber from './table/filteredAndSorted/popmassnber'
import filteredAndSortedPopber from './table/filteredAndSorted/popber'
import filteredAndSortedTpop from './table/filteredAndSorted/tpop'
import filteredAndSortedTpopbeob from './table/filteredAndSorted/tpopbeob'
import filteredAndSortedTopber from './table/filteredAndSorted/tpopber'
import filteredAndSortedTpopfreiwkontr from './table/filteredAndSorted/tpopfreiwkontr'
import filteredAndSortedTpopfreiwkontrzaehl from './table/filteredAndSorted/tpopfreiwkontrzaehl'
import filteredAndSortedTpopfeldkontr from './table/filteredAndSorted/tpopfeldkontr'
import filteredAndSortedTpopfeldkontrzaehl from './table/filteredAndSorted/tpopfeldkontrzaehl'
import filteredAndSortedTpopmassnber from './table/filteredAndSorted/tpopmassnber'
import filteredAndSortedTpopmassn from './table/filteredAndSorted/tpopmassn'
import deleteBeobzuordnung from './action/deleteBeobzuordnung'
import setActiveBaseLayer from './action/setActiveBaseLayer'
import moveOverlay from './action/moveOverlay'
import moveApfloraLayer from './action/moveApfloraLayer'
import tpopIdsInsideFeatureCollection from '../modules/tpopIdsInsideFeatureCollection'
import popIdsInsideFeatureCollection from '../modules/popIdsInsideFeatureCollection'

import TableStore from './table'
import ObservableHistory from './ObservableHistory'

function Store() {
  this.history = ObservableHistory
  this.loading = []
  this.activeUrlElements = {}
  extendObservable(this, {
    loading: [],
  })
  this.node = {
    apFilter: false,
    nodeLabelFilter: {},
    nodeMapFilter: {},
    node: {}
  }
  extendObservable(this.node, {
    apFilter: false,
    nodeLabelFilter: observable.map({}),
    updateLabelFilter: action(`updateLabelFilter`, (table, value) => {
      if (!table) {
        return this.listError(
          new Error(`nodeLabelFilter cant be updated: no table passed`)
        )
      }
      this.node.nodeLabelFilter.set(table, value)
    }),
    nodeMapFilter: observable.map({
      pop: [],
      tpop: [],
    }),
    updateMapFilter: action(`updateMapFilter`, (mapFilterItems) => {
      if (!mapFilterItems) {
        this.node.nodeMapFilter.set(`tpop`, [])
        this.node.nodeMapFilter.set(`pop`, [])
      } else {
        this.node.nodeMapFilter.set(`tpop`, tpopIdsInsideFeatureCollection(this, mapFilterItems.toGeoJSON()))
        this.node.nodeMapFilter.set(`pop`, popIdsInsideFeatureCollection(this, mapFilterItems.toGeoJSON()))
      }
    }),
    // action when user clicks on a node in the tree
    toggleNode: action(`toggleNode`, node =>
      toggleNode(this, node)
    ),
  })
  extendObservable(this.node.node, {
    projekt: computed(
      () => projektNodes(this)
    ),
    apFolder: computed(
      () => apFolderNodes(this)
    ),
    apberuebersichtFolder: computed(
      () => apberuebersichtFolderNodes(this)
    ),
    exporteFolder: computed(
      () => exporteFolderNodes(this)
    ),
    apberuebersicht: computed(
      () => apberuebersichtNodes(this)
    ),
    ap: computed(
      () => apNodes(this)
    ),
    nodes: computed(
      () => allNodes(this)
    ),
    qkFolder: computed(
      () => qkFolderNode(this),
    ),
    assozartFolder: computed(
      () => assozartFolderNode(this),
    ),
    assozart: computed(
      () => assozartNode(this),
    ),
    idealbiotopFolder: computed(
      () => idealbiotopFolderNode(this),
    ),
    beobNichtZuzuordnenFolder: computed(
      () => beobNichtZuzuordnenFolderNode(this),
    ),
    beobNichtZuzuordnen: computed(
      () => beobNichtZuzuordnenNode(this),
    ),
    beobzuordnungFolder: computed(
      () => beobzuordnungFolderNode(this),
    ),
    beobzuordnung: computed(
      () => beobzuordnungNode(this),
    ),
    berFolder: computed(
      () => berFolderNode(this),
    ),
    ber: computed(
      () => berNode(this),
    ),
    apberFolder: computed(
      () => apberFolderNode(this),
    ),
    apber: computed(
      () => apberNode(this),
    ),
    erfkritFolder: computed(
      () => erfkritFolderNode(this),
    ),
    erfkrit: computed(
      () => erfkritNode(this),
    ),
    zieljahrFolder: computed(
      () => zieljahreFolderNode(this),
    ),
    zieljahr: computed(
      () => zieljahrNode(this),
    ),
    ziel: computed(
      () => zielNode(this),
    ),
    zielberFolder: computed(
      () => zielberFolderNode(this),
    ),
    zielber: computed(
      () => zielberNode(this),
    ),
    popFolder: computed(
      () => popFolderNode(this),
    ),
    pop: computed(
      () => popNode(this),
    ),
    popmassnberFolder: computed(
      () => popmassnberFolderNode(this),
    ),
    popmassnber: computed(
      () => popmassnberNode(this),
    ),
    popberFolder: computed(
      () => popberFolderNode(this),
    ),
    popber: computed(
      () => popberNode(this),
    ),
    tpopFolder: computed(
      () => tpopFolderNode(this),
    ),
    tpop: computed(
      () => tpopNode(this),
    ),
    tpopbeobFolder: computed(
      () => tpopbeobFolderNode(this),
    ),
    tpopbeob: computed(
      () => tpopbeobNode(this),
    ),
    tpopberFolder: computed(
      () => tpopberFolderNode(this),
    ),
    tpopber: computed(
      () => tpopberNode(this),
    ),
    tpopfreiwkontrFolder: computed(
      () => tpopfreiwkontrFolderNode(this),
    ),
    tpopfreiwkontr: computed(
      () => tpopfreiwkontrNode(this),
    ),
    tpopfreiwkontrzaehlFolder: computed(
      () => tpopfreiwkontrzaehlFolderNode(this),
    ),
    tpopfreiwkontrzaehl: computed(
      () => tpopfreiwkontrzaehlNode(this),
    ),
    tpopfeldkontrFolder: computed(
      () => tpopfeldkontrFolderNode(this),
    ),
    tpopfeldkontr: computed(
      () => tpopfeldkontrNode(this),
    ),
    tpopfeldkontrzaehlFolder: computed(
      () => tpopfeldkontrzaehlFolderNode(this),
    ),
    tpopfeldkontrzaehl: computed(
      () => tpopfeldkontrzaehlNode(this),
    ),
    tpopmassnberFolder: computed(
      () => tpopmassnberFolderNode(this),
    ),
    tpopmassnber: computed(
      () => tpopmassnberNode(this),
    ),
    tpopmassnFolder: computed(
      () => tpopmassnFolderNode(this),
    ),
    tpopmassn: computed(
      () => tpopmassnNode(this),
    ),
  })
  this.ui = {}
  extendObservable(this.ui, {
    windowWidth: $(window).width(),
    windowHeight: $(window).height(),
    treeHeight: 0,
    lastClickY: 0,
    treeTopPosition: 0,
  })
  this.app = {}
  extendObservable(this.app, {
    errors: [],
    fields: [],
  })
  this.user = {}
  // name set to prevent Login Dialog from appearing before setLoginFromIdb has fetched from idb
  extendObservable(this.user, {
    name: `temporaryValue`,
    roles: [],
    readOnly: true,
  })
  this.map = {
    bounds: [],
    mouseCoord: [],
    mouseCoordEpsg21781: [],
    pop: {},
    tpop: {},
    beob: {},
    beobNichtBeurteilt: {},
    beobNichtZuzuordnen: {},
    tpopBeob: {},
    activeBaseLayer: `OsmColor`,
    activeOverlays: [],
    activeApfloraLayers: [],
    activeOverlaysSorted: [],
    activeApfloraLayersSorted: [],
    overlays: [],
    apfloraLayers: [],
    addActiveOverlay: () => {},
    removeActiveOverlay: () => {},
    setActiveBaseLayer: () => {},
    addActiveApfloraLayer: () => {},
    removeActiveApfloraLayer: () => {},
  }
  extendObservable(this.map, {
    bounds: [[47.159, 8.354], [47.696, 8.984]],
    changeBounds: action(`changeBounds`, (bounds) => this.map.bounds = bounds),
    mouseCoord: [],
    mouseCoordEpsg21781: computed(
      () => {
        if (this.map.mouseCoord.length > 0) {
          return epsg4326to21781(this.map.mouseCoord[0], this.map.mouseCoord[1])
        }
        return []
      },
    ),
    activeBaseLayer: `OsmColor`,
    setActiveBaseLayer: action(`setActiveBaseLayer`, (layer) => setActiveBaseLayer(this, layer)),
    overlays: observable([
      { label: `ZH Übersichtsplan`, value: `ZhUep` },
      { label: `Detailplaene`, value: `Detailplaene` },
      { label: `ZH Gemeindegrenzen`, value: `ZhGemeindegrenzen` },
      { label: `SVO grau`, value: `ZhSvoGrey` },
      { label: `SVO farbig`, value: `ZhSvoColor` },
      { label: `Lebensraum- und Vegetationskartierungen`, value: `ZhLrVegKartierungen` },
      { label: `Wälder: lichte`, value: `ZhLichteWaelder` },
      { label: `Wälder: Vegetation`, value: `ZhWaelderVegetation` },
    ]),
    overlaysString: computed(
      () => this.map.overlays.map(o => o.value).join(),
    ),
    moveOverlay: action(`moveOverlay`, ({ oldIndex, newIndex }) =>
      moveOverlay(this, oldIndex, newIndex)
    ),
    activeOverlays: [],
    activeOverlaysSorted: computed(
      () => sortBy(this.map.activeOverlays, (activeOverlay) =>
        this.map.overlays.findIndex((overlay) => overlay.value === activeOverlay)
      ),
    ),
    activeOverlaysSortedString: computed(
      () => this.map.activeOverlaysSorted.join(),
    ),
    addActiveOverlay: action(`addActiveOverlay`, layer => this.map.activeOverlays.push(layer)),
    removeActiveOverlay: action(`removeActiveOverlay`, (layer) => {
      this.map.activeOverlays = this.map.activeOverlays.filter(o => o !== layer)
    }),
    apfloraLayers: observable([
      { label: `Populationen`, value: `Pop` },
      { label: `Teil-Populationen`, value: `Tpop` },
      { label: `Beobachtungen: zugeordnet`, value: `TpopBeob` },
      { label: `Beobachtungen: nicht beurteilt`, value: `BeobNichtBeurteilt` },
      { label: `Beobachtungen: nicht zuzuordnen`, value: `BeobNichtZuzuordnen` },
      { label: `Zuordnungs-Linien`, value: `TpopBeobAssignPolylines` },
      { label: `Karten-Filter`, value: `MapFilter` },
    ]),
    apfloraLayersString: computed(
      () => this.map.apfloraLayers.map(o => o.value).join(),
    ),
    moveApfloraLayer: action(`moveApfloraLayer`, ({ oldIndex, newIndex }) =>
      moveApfloraLayer(this, oldIndex, newIndex)
    ),
    activeApfloraLayers: [],
    activeApfloraLayersSorted: computed(
      () => sortBy(this.map.activeApfloraLayers, (activeApfloraLayer) =>
        this.map.apfloraLayers.findIndex((apfloraLayer) =>
          apfloraLayer.value === activeApfloraLayer
        )
      ),
    ),
    activeApfloraLayersSortedString: computed(
      () => this.map.activeApfloraLayersSorted.join(),
    ),
    addActiveApfloraLayer: action(`addActiveApfloraLayer`, layer =>
      this.map.activeApfloraLayers.push(layer)
    ),
    removeActiveApfloraLayer: action(`removeActiveApfloraLayer`, (layer) => {
      this.map.activeApfloraLayers = this.map.activeApfloraLayers.filter(o => o !== layer)
    }),
    showMapLayer: action(`showMapLayer`, (layer, bool) => {
      if (bool) {
        this.map.addActiveOverlay(layer)
      } else {
        this.map.removeActiveOverlay(layer)
      }
    }),
    showMapApfloraLayer: action(`showMapApfloraLayer`, (layer, bool) => {
      if (bool) {
        this.map.addActiveApfloraLayer(layer)
      } else {
        this.map.removeActiveApfloraLayer(layer)
      }
    }),
    setIdOfTpopBeingLocalized: action(`setIdOfTpopBeingLocalized`, (id) => {
      if (this.user.readOnly) return this.tellUserReadOnly()
      this.map.tpop.idOfTpopBeingLocalized = id
    }),
    localizeTpop: action(`localizeTpop`, (x, y) => {
      if (this.user.readOnly) return this.tellUserReadOnly()
      localizeTpop(this, x, y)
    }),
    setMapMouseCoord: action(`setMapMouseCoord`, (e) => {
      this.map.mouseCoord = [e.latlng.lng, e.latlng.lat]
    }),
    toggleMapPopLabelContent: action(`toggleMapPopLabelContent`, (layer) =>
      this.map[layer].labelUsingNr = !this.map[layer].labelUsingNr
    ),
  })
  extendObservable(this.map.pop, {
    // apArtId is needed because
    // need to pass apArtId when activeUrlElements.ap
    // is not yet set...
    apArtId: null,
    highlightedIds: computed(
      () => {
        const nodeMapFilterPop = this.node.nodeMapFilter.get(`pop`)
        if (nodeMapFilterPop.length > 0) {
          return nodeMapFilterPop
        }
        if (this.activeUrlElements.pop) {
          return [this.activeUrlElements.pop]
        }
        return []
      },
    ),
    pops: computed(() => getPopsForMap(this)),
    bounds: computed(() => getPopBounds(this.map.pop.pops)),
    boundsOfHighlightedIds: computed(
      () => getPopBounds(
        this.map.pop.pops
          .filter(p => this.map.pop.highlightedIds.includes(p.PopId))
      ),
    ),
    // alternative is using names
    labelUsingNr: true,
    markers: computed(() => getPopMarkers(this)),
  })
  extendObservable(this.map.tpop, {
    highlightedIds: computed(
      () => {
        const nodeMapFilterTpop = this.node.nodeMapFilter.get(`tpop`)
        if (nodeMapFilterTpop.length > 0) {
          return nodeMapFilterTpop
        }
        if (this.activeUrlElements.tpop) {
          return [this.activeUrlElements.tpop]
        }
        return []
      }
    ),
    highlightedPopIds: [],
    tpops: computed(() => getTpopsForMap(this)),
    bounds: computed(() => getTpopBounds(this.map.tpop.tpops)),
    boundsOfHighlightedIds: computed(
      () => getTpopBounds(
        this.map.tpop.tpops
          .filter(t => this.map.tpop.highlightedIds.includes(t.TPopId))
      )
    ),
    // alternative is using names
    labelUsingNr: true,
    markers: computed(() => getTpopMarkers(this)),
    markersClustered: computed(() => getTpopMarkersClustered(this)),
    idOfTpopBeingLocalized: 0,
  })
  extendObservable(this.map.beob, {
    highlightedIds: [],
    beobs: computed(() => getBeobForMap(this)),
    markersClustered: computed(
      () => getBeobMarkersClustered(this)
    ),
    markers: computed(
      () => getBeobMarkers(this)
    ),
    assigning: false,
    toggleAssigning: action(`toggleAssigning`, () =>
      this.map.beob.assigning = !this.map.beob.assigning
    ),
  })
  extendObservable(this.map.beobNichtBeurteilt, {
    highlightedIds: computed(
      () => (
        this.activeUrlElements.beobzuordnung ?
        [this.activeUrlElements.beobzuordnung] :
        []
      )
    ),
    markersClustered: computed(
      () => getBeobNichtBeurteiltMarkersClustered(this)
    ),
    markers: computed(
      () => getBeobNichtBeurteiltMarkers(this)
    ),
    beobs: computed(
      () => getBeobForMap(this).filter(b => !b.beobzuordnung)
    ),
    bounds: computed(
      () => getBeobNichtBeurteiltBounds(this.map.beobNichtBeurteilt.beobs)
    ),
    boundsOfHighlightedIds: computed(
      () => getBeobNichtBeurteiltBounds(
        this.map.beobNichtBeurteilt.beobs
          .filter(b => this.map.beobNichtBeurteilt.highlightedIds.includes(b.BeobId))
      )
    ),
    idOfBeobBeingAssigned: 0,
  })
  extendObservable(this.map.beobNichtZuzuordnen, {
    highlightedIds: computed(
      () => (
        this.activeUrlElements.beobNichtZuzuordnen ?
        [this.activeUrlElements.beobNichtZuzuordnen] :
        []
      )
    ),
    markersClustered: computed(
      () => getBeobNichtZuzuordnenMarkersClustered(this)
    ),
    beobs: computed(
      () => getBeobForMap(this).filter(b => b.beobzuordnung && b.beobzuordnung.BeobNichtZuordnen === 1)
    ),
    bounds: computed(
      () => getBeobNichtZuzuordnenBounds(this.map.beobNichtZuzuordnen.beobs)
    ),
    boundsOfHighlightedIds: computed(
      () => getBeobNichtZuzuordnenBounds(
        this.map.beobNichtZuzuordnen.beobs
          .filter(b =>
            this.map.beobNichtZuzuordnen.highlightedIds.includes(
              isNaN(b.BeobId) ? b.BeobId : Number(b.BeobId)
            )
          )
      )
    ),
  })
  extendObservable(this.map.tpopBeob, {
    highlightedIds: computed(
      () => {
        const { activeUrlElements } = this
        if (activeUrlElements.tpopbeob) {
          return [activeUrlElements.tpopbeob]
        } else if (activeUrlElements.tpop) {
          return this.map.tpopBeob.beobs.filter(b =>
            b.beobzuordnung && b.beobzuordnung.TPopId === activeUrlElements.tpop
          ).map(b => b.BeobId)
        } else if (activeUrlElements.pop) {
          return this.map.tpopBeob.beobs.filter((b) => {
            const tpop = this.table.tpop.get(b.beobzuordnung.TPopId)
            if (tpop) {
              const popId = tpop.PopId
              return popId && popId === activeUrlElements.pop
            }
            return false
          }).map(b => b.BeobId)
        }
        return []
      }
    ),
    markersClustered: computed(
      () => getTpopBeobMarkersClustered(this)
    ),
    markers: computed(
      () => getTpopBeobMarkers(this)
    ),
    assignPolylines: computed(
      () => getTpopBeobAssignPolylines(this)
    ),
    beobs: computed(
      () => getBeobForMap(this).filter(b =>
        b.beobzuordnung &&
        b.beobzuordnung.TPopId &&
        !b.beobzuordnung.BeobNichtZuzuordnen
      )
    ),
    bounds: computed(
      () => getTpopBeobBounds(this.map.tpopBeob.beobs)
    ),
    boundsOfHighlightedIds: computed(
      () => getTpopBeobBounds(
        this.map.tpopBeob.beobs
          .filter(b => this.map.tpopBeob.highlightedIds.includes(b.BeobId))
      )
    ),
  })
  this.table = TableStore
  extendObservable(this.table.filteredAndSorted, {
    projekt: computed(
      () => filteredAndSortedProjekt(this)
    ),
    apberuebersicht: computed(
      () => filteredAndSortedApberuebersicht(this)
    ),
    ap: computed(
      () => filteredAndSortedAp(this)
    ),
    assozart: computed(
      () => filteredAndSortedAssozart(this)
    ),
    idealbiotop: computed(
      () => filteredAndSortedIdealbiotop(this)
    ),
    beobNichtZuzuordnen: computed(
      () => filteredAndSortedBeobNichtZuzuordnen(this)
    ),
    beobzuordnung: computed(
      () => filteredAndSortedBeobzuordnung(this)
    ),
    ber: computed(
      () => filteredAndSortedBer(this)
    ),
    apber: computed(
      () => filteredAndSortedApber(this)
    ),
    erfkrit: computed(
      () => filteredAndSortedErfkrit(this)
    ),
    zieljahr: computed(
      () => filteredAndSortedZieljahr(this)
    ),
    ziel: computed(
      () => filteredAndSortedZiel(this)
    ),
    zielber: computed(
      () => filteredAndSortedZielber(this)
    ),
    pop: computed(
      () => filteredAndSortedPop(this)
    ),
    popmassnber: computed(
      () => filteredAndSortedPopmassnber(this)
    ),
    popber: computed(
      () => filteredAndSortedPopber(this)
    ),
    tpop: computed(
      () => filteredAndSortedTpop(this)
    ),
    tpopbeob: computed(
      () => filteredAndSortedTpopbeob(this)
    ),
    tpopber: computed(
      () => filteredAndSortedTopber(this)
    ),
    tpopfreiwkontr: computed(
      () => filteredAndSortedTpopfreiwkontr(this)
    ),
    tpopfreiwkontrzaehl: computed(
      () => filteredAndSortedTpopfreiwkontrzaehl(this)
    ),
    tpopfeldkontr: computed(
      () => filteredAndSortedTpopfeldkontr(this)
    ),
    tpopfeldkontrzaehl: computed(
      () => filteredAndSortedTpopfeldkontrzaehl(this)
    ),
    tpopmassnber: computed(
      () => filteredAndSortedTpopmassnber(this)
    ),
    tpopmassn: computed(
      () => filteredAndSortedTpopmassn(this)
    ),
  })
  this.valuesForWhichTableDataWasFetched = {}
  this.qk = observable.map()
  extendObservable(this, {
    /**
     * url paths are used to control tree and forms
     */
    url: computed(
      //$FlowIssue
      () => getUrl(this.history.location.pathname)
    ),
    /**
     * urlQueries are used to control tabs
     * for instance: Entwicklung or Biotop in tpopfeldkontr
     */
    urlQuery: computed(
      //$FlowIssue
      () => getUrlQuery(this.history.location.search)
    ),
    projektNodes: computed(
      () => buildProjektNodes(this)
    ),
    activeDataset: computed(
      () => updateActiveDatasetFromUrl(this)
    ),
    activeUrlElements: computed(
      () => getActiveUrlElements(this.url)
    ),
    datasetToDelete: {},
    tellUserReadOnly: action(`tellUserReadOnly`, () =>
      this.listError(new Error(`Sie haben keine Schreibrechte`))
    ),
    fetchLogin: action(`fetchLogin`, (name, password) =>
      fetchLogin(this, name, password)
    ),
    logout: action(`logout`, () =>
      logout(this)
    ),
    setLoginFromIdb: action(`setLoginFromIdb`, () =>
      setLoginFromIdb(this)
    ),
    toggleApFilter: action(`toggleApFilter`, () => {
      this.node.apFilter = !this.node.apFilter
    }),
    fetchQk: action(`fetchQk`, () => fetchQk({ store: this })),
    setQk: action(`setQk`, ({ berichtjahr, messages, filter }) =>
      setQk({ store: this, berichtjahr, messages, filter })
    ),
    setQkFilter: action(`setQkFilter`, ({ filter }) =>
      setQkFilter({ store: this, filter })
    ),
    addMessagesToQk: action(`addMessagesToQk`, ({ messages }) => {
      addMessagesToQk({ store: this, messages })
    }),
    fetchFieldsFromIdb: action(`fetchFieldsFromIdb`, () =>
      fetchFieldsFromIdb(this)
    ),
    insertBeobzuordnung: action(`insertBeobzuordnung`, (newKey, newValue) => {
      if (this.user.readOnly) return this.tellUserReadOnly()
      insertBeobzuordnung(this, newKey, newValue)
    }),
    insertDataset: action(`insertDataset`, (table, parentId, baseUrl) => {
      if (this.user.readOnly) return this.tellUserReadOnly()
      insertDataset(this, table, parentId, baseUrl)
    }),
    deleteDatasetDemand: action(`deleteDatasetDemand`, (table, id, url, label) => {
      if (this.user.readOnly) return this.tellUserReadOnly()
      deleteDatasetDemand(this, table, id, url, label)
    }),
    deleteDatasetAbort: action(`deleteDatasetAbort`, () => {
      this.datasetToDelete = {}
    }),
    deleteDatasetExecute: action(`deleteDatasetExecute`, () => {
      if (this.user.readOnly) return this.tellUserReadOnly()
      deleteDatasetExecute(this)
    }),
    deleteBeobzuordnung: action(`deleteBeobzuordnung`, (beobId) =>
      deleteBeobzuordnung(this, beobId)
    ),
    listError: action(`listError`, error =>
      listError(this, error)
    ),
    // updates data in store
    updateProperty: action(`updateProperty`, (key, value) => {
      if (this.user.readOnly) return this.tellUserReadOnly()
      updateProperty(this, key, value)
    }),
    // updates data in database
    updatePropertyInDb: action(`updatePropertyInDb`, (key, value) => {
      if (this.user.readOnly) return this.tellUserReadOnly()
      updatePropertyInDb(this, key, value)
    }),
    // fetch all data of a table
    // primarily used for werte (domain) tables
    // and projekt
    fetchTable: action(`fetchTable`, (schemaName, tableName) =>
      fetchTable(this, schemaName, tableName)
    ),
    fetchStammdaten: action(`fetchStammdaten`, () => {
      fetchFields(this)
      fetchStammdatenTables(this)
    }),
    fetchBeobzuordnung: action(`fetchBeobzuordnung`, apArtId =>
      fetchBeobzuordnungModule(this, apArtId)
    ),
    // fetch data of table for id of parent table
    // used for actual apflora data (but projekt)
    fetchTableByParentId: action(`fetchTableByParentId`, (schemaName, tableName, parentId) =>
      fetchTableByParentId(this, schemaName, tableName, parentId)
    ),
    fetchTpopForAp: action(`fetchTpopForAp`, apArtId =>
      fetchTpopForAp(this, apArtId)
    ),
    fetchPopForAp: action(`fetchPopForAp`, apArtId =>
      fetchPopForAp(this, apArtId)
    ),
    fetchDatasetById: action(`fetchDatasetById`, ({ schemaName, tableName, id }) =>
      fetchDatasetById({ store: this, schemaName, tableName, id })
    ),
    fetchBeobBereitgestellt: action(`fetchBeobBereitgestellt`, apArtId =>
      fetchBeobBereitgestellt(this, apArtId)
    ),
    fetchBeobEvab: action(`fetchBeobEvab`, apArtId =>
      fetchBeobEvab(this, apArtId)
    ),
    fetchBeobInfospezies: action(`fetchBeobInfospezies`, apArtId =>
      fetchBeobInfospezies(this, apArtId)
    ),
    /**
     * urlQueries are used to control tabs
     * for instance: Entwicklung or Biotop in tpopfeldkontr
     * or: strukturbaum, daten and map in projekte
     */
    setUrlQuery: action(`setUrlQuery`, (key, value) =>
      setUrlQuery(this, key, value)
    ),
  })
}

const MyStore = new Store()

// don't know why but combining this with last extend call
// creates an error in an autorun
// maybe needed actions are not part of Store yet?
extendObservable(
  MyStore,
  {
    manipulateUrl: autorun(
      `manipulateUrl`,
      () => manipulateUrl(MyStore)
    ),
    reactWhenUrlHasChanged: autorunAsync(
      `reactWhenUrlHasChanged`,
      () => {
        // need to pass visibility of layers to make data fetched on changing layers
        const showTpop = MyStore.map.activeApfloraLayers.includes(`Tpop`)
        const showPop = MyStore.map.activeApfloraLayers.includes(`Pop`)
        const showTpopBeob = MyStore.map.activeApfloraLayers.includes(`TpopBeob`) || MyStore.map.activeApfloraLayers.includes(`TpopBeobAssignPolylines`)
        const showBeobNichtBeurteilt = MyStore.map.activeApfloraLayers.includes(`BeobNichtBeurteilt`)
        const showBeobNichtZuzuordnen = MyStore.map.activeApfloraLayers.includes(`BeobNichtZuzuordnen`)
        fetchDataForActiveUrlElements(MyStore, showPop, showTpop, showTpopBeob, showBeobNichtBeurteilt, showBeobNichtZuzuordnen)
      }
    ),
  }
)

export default MyStore
