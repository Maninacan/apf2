// @flow
export default (store:Object, x:number, y:number) => {
  if (!store) return console.log(`no store passed to localizeTpop`)
  if (!x) return store.listError(new Error(`no x coordinate passed to localizeTpop`))
  if (!y) return store.listError(new Error(`no y coordinate passed to localizeTpop`))
  let { idOfTpopBeingLocalized } = store.map.tpop
  const tpops = Array.from(store.table.tpop.values())
  const tpop = tpops.find(t => t.TPopId === idOfTpopBeingLocalized)
  if (!tpop) return store.listError(new Error(`no tpop found with id "${idOfTpopBeingLocalized}"`))
  const xRounded = Number(x).toFixed(0)
  const yRounded = Number(y).toFixed(0)
  store.updateProperty(`TPopXKoord`, xRounded)
  store.updatePropertyInDb(`TPopXKoord`, xRounded)
  store.updateProperty(`TPopYKoord`, yRounded)
  store.updatePropertyInDb(`TPopYKoord`, yRounded)
  // reset localizing
  store.map.tpop.idOfTpopBeingLocalized = 0
}