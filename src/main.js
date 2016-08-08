// author - Antoine Barbaroux

import async from 'async'
import apiGet from './apicall'
import ARTISTS from './artists'
import _ from 'lodash'

console.log('starting\n', ARTISTS)

const sortByPop = list => _.sortBy(list, i => i.popularity)
const topTwo = list => _.slice(sortByPop(list), 0, 2)

const getId = i => i.id
const getIds = list => _.map(list, getId)
const getName = i => i.name
const getNames = list => _.map(list, getName)

// const print = x => (console.log(x), x)
const fetchArtist = (id, cb) => apiGet(`artists/${id}`)(cb)
const fetchArtists = (list, cb) => async.map(list, fetchArtist, cb)
const fetchRelated = id => cb => (
  apiGet(`artists/${id}/related-artists`)(
    (e, r) => cb(e, getIds(topTwo(r.artists)))
  )
)
const fetchTracks = (id, cb) => (
  apiGet(`artists/${id}/top-tracks?country=FR`)(
    (e, r) => cb(e, getNames(topTwo(r.tracks)))
  )
)

const wf = id => fetchRelated(id)
const wf2 = (ids, cb) => async.map(ids, fetchTracks, cb)

const testWaterfall = (id, callback) => (
  async.waterfall(
    [
      fetchRelated(id),
      wf2,
      // ids => async.map(ids, fetchTracks),
      // tracks => cb => {console.log(tracks); cb(null, tracks)}
    ],
    callback
  )
)

const fiddleWithSpotify = () => {
  async.map(
    ARTISTS,
    testWaterfall,
    console.log
  )
}
// const topFive = artists => 

    // cb => {
    //     setTimeout((cb) => {
    //     console.log('first', 'toto');
    //   }, 1000), cb(null, 1)},
    // id => apiGet(`artists/${id}`),
// const first = message => cb => {
//   console.log(message);
//   cb(null, '1st')
// }
// const second = cb => {cb(null, '2nd')}

// const fiddleWithSpotify = () => {
//   async.parallel([
//     first('Et la ca marche'),
//     second,
//     cb => {cb(3, 'the third errs')},
//   ], console.log);
// }

fiddleWithSpotify()
console.log('done');