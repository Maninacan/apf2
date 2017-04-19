// for sorting see:
// //stackoverflow.com/questions/13211709/javascript-sort-array-by-multiple-number-fields
// also: needed to account for elements not having the next array elements
// to be sorted before those that have
// that is why there is if (a !== 0 && !a)

import projektNodes from '../../../modules/nodes/projekt'
import apFolderNodes from '../../../modules/nodes/apFolder'
import apberuebersichtFolderNodes
  from '../../../modules/nodes/apberuebersichtFolder'
import apberuebersichtNodes from '../../../modules/nodes/apberuebersicht'
import apNodes from '../../../modules/nodes/ap'
import popFolderNodes from '../../../modules/nodes/popFolder'
import qkFolderNodes from '../../../modules/nodes/qkFolder'
import beobNichtZuzuordnenFolderNodes
  from '../../../modules/nodes/beobNichtZuzuordnenFolder'
import beobzuordnungFolderNodes
  from '../../../modules/nodes/beobzuordnungFolder'
import assozartFolderNodes from '../../../modules/nodes/assozartFolder'
import idealbiotopFolderNodes from '../../../modules/nodes/idealbiotopFolder'
import berFolderNodes from '../../../modules/nodes/berFolder'
import apberFolderNodes from '../../../modules/nodes/apberFolder'
import erfkritFolderNodes from '../../../modules/nodes/erfkritFolder'
import zieljahrFolderNodes from '../../../modules/nodes/zieljahrFolder'
import zieljahrNodes from '../../../modules/nodes/zieljahr'
import zielNodes from '../../../modules/nodes/ziel'
import zielberFolderNodes from '../../../modules/nodes/zielberFolder'
import zielberNodes from '../../../modules/nodes/zielber'

const compare = (a, b) => {
  // sort a before, if it has no value at this index
  if (a !== 0 && !a) return -1
  // sort a after if b has no value at this index
  if (b !== 0 && !b) return 1
  // sort a before if its value is smaller
  return a - b
}

export default (store, tree) => {
  const { openNodes } = tree

  let nodes = projektNodes(store, tree)
  // do not process ['Projekte']
  const nodesToProcess = openNodes.filter(n => n.length > 1)

  nodesToProcess.forEach(node => {
    const projId = node[1]
    if (node.length === 2) {
      nodes = [...nodes, ...apFolderNodes(store, tree, projId)]
      nodes = [...nodes, ...apberuebersichtFolderNodes(store, tree, projId)]
    }
    if (node.length === 3 && node[2] === 'AP-Berichte') {
      nodes = [...nodes, ...apberuebersichtNodes(store, tree, projId)]
    }
    if (node.length === 3 && node[2] === 'Arten') {
      nodes = [...nodes, ...apNodes(store, tree, projId)]
    }
    // if node.length > 3, node[2] is always 'Arten'
    if (node.length === 4) {
      const apArtId = node[3]
      nodes = [...nodes, ...popFolderNodes(store, tree, projId, apArtId)]
      nodes = [...nodes, ...qkFolderNodes(store, tree, projId, apArtId)]
      nodes = [
        ...nodes,
        ...beobNichtZuzuordnenFolderNodes(store, tree, projId, apArtId)
      ]
      nodes = [
        ...nodes,
        ...beobzuordnungFolderNodes(store, tree, projId, apArtId)
      ]
      nodes = [...nodes, ...assozartFolderNodes(store, tree, projId, apArtId)]
      nodes = [
        ...nodes,
        ...idealbiotopFolderNodes(store, tree, projId, apArtId)
      ]
      nodes = [...nodes, ...berFolderNodes(store, tree, projId, apArtId)]
      nodes = [...nodes, ...apberFolderNodes(store, tree, projId, apArtId)]
      nodes = [...nodes, ...erfkritFolderNodes(store, tree, projId, apArtId)]
      nodes = [...nodes, ...zieljahrFolderNodes(store, tree, projId, apArtId)]
    }
    if (node.length === 5 && node[4] === 'AP-Ziele') {
      const apArtId = node[3]
      nodes = [...nodes, ...zieljahrNodes(store, tree, projId, apArtId)]
    }
    if (node.length === 6 && node[4] === 'AP-Ziele') {
      const apArtId = node[3]
      const zieljahr = node[5]
      nodes = [...nodes, ...zielNodes(store, tree, projId, apArtId, zieljahr)]
    }
    if (node.length === 7 && node[4] === 'AP-Ziele') {
      const apArtId = node[3]
      const zieljahr = node[5]
      const zielId = node[6]
      nodes = [
        ...nodes,
        ...zielberFolderNodes(store, tree, projId, apArtId, zieljahr, zielId)
      ]
    }
    if (node.length === 8 && node[4] === 'AP-Ziele' && node[7] === 'Berichte') {
      console.log('node:', node)
      const apArtId = node[3]
      const zieljahr = node[5]
      const zielId = node[6]
      nodes = [
        ...nodes,
        ...zielberNodes(store, tree, projId, apArtId, zieljahr, zielId)
      ]
    }
  })

  /**
   * As all nodes are now in one flat list,
   * we need to sort them
   *
   * This is the sorting algorithm:
   *
   * compare the sort array value in the nodes
   * to determine sorting
   *
   * compare arrays element by element, starting with first
   * if a has no value at this index (> a is folder), sort a before b
   * if b has no value at this index (> b is folder), sort a after b
   * if a is smaller than b, sort a before b
   * if both array elements at this index are same,
   * compare values at next index
   */
  return nodes.sort(
    (a, b) =>
      compare(a.sort[0], b.sort[0]) ||
      compare(a.sort[1], b.sort[1]) ||
      compare(a.sort[2], b.sort[2]) ||
      compare(a.sort[3], b.sort[3]) ||
      compare(a.sort[4], b.sort[4]) ||
      compare(a.sort[5], b.sort[5]) ||
      compare(a.sort[6], b.sort[6]) ||
      compare(a.sort[7], b.sort[7]) ||
      compare(a.sort[8], b.sort[8]) ||
      compare(a.sort[9], b.sort[9]) ||
      compare(a.sort[10], b.sort[10])
  )
}
