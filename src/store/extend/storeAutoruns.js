// @flow
// don't know why but combining this with extendStore call
// creates an error in an autorun
// maybe needed actions are not part of Store yet?
import {
  extendObservable,
  autorun,
  autorunAsync,
} from 'mobx'

import fetchDataForActiveUrlElements from '../../modules/fetchDataForActiveUrlElements'
import manipulateUrl from '../../modules/manipulateUrl'

export default (store:Object) => {
  extendObservable(store, {
    manipulateUrl: autorun(
      `manipulateUrl`,
      () => manipulateUrl(store)
    ),
    reactWhenUrlHasChanged: autorunAsync(
      `reactWhenUrlHasChanged`,
      () => {
        // need to pass visibility of layers to make data fetched on changing layers
        const showTpop = store.map.activeApfloraLayers.includes(`Tpop`)
        const showPop = store.map.activeApfloraLayers.includes(`Pop`)
        const showTpopBeob = store.map.activeApfloraLayers.includes(`TpopBeob`) || store.map.activeApfloraLayers.includes(`TpopBeobAssignPolylines`)
        const showBeobNichtBeurteilt = store.map.activeApfloraLayers.includes(`BeobNichtBeurteilt`)
        const showBeobNichtZuzuordnen = store.map.activeApfloraLayers.includes(`BeobNichtZuzuordnen`)
        fetchDataForActiveUrlElements(store, showPop, showTpop, showTpopBeob, showBeobNichtBeurteilt, showBeobNichtZuzuordnen)
      }
    ),
  })
}