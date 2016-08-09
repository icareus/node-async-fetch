// author - Antoine Barbaroux

import async from 'async'
import { apiGet, getArtist, getRelated, getTracks } from './apicall'
import ARTISTS from './artists'
import _ from 'lodash'

const sortByPop = list => _.sortBy(list, i => (i.popularity * -1))
const topN = (list, n) => _.slice(sortByPop(list), 0, n)

const getId = i => i.id
const getIds = list => _.map(list, getId)
const getName = i => i.name
const getNames = list => _.map(list, getName)

//const cb_success = (e, r) => 
const fetchArtist = id => cb => {
  getArtist(id)((e, r) => cb(null, {id: r.id, name: r.name}))
}
const fetchRelated = (artist, cb) => {
  getRelated(artist.id)((e, r) => cb(e, getIds(topN(r.artists, 2))))
}
const fetchTracks = (ids, cb) => {
  async.map(
    ids,
    (id, callback) => getTracks(id)((e, {tracks}) => {
          callback(null, topN(tracks, 1));
        }),
    (err, tracks) => {
      cb(null, _.first(tracks));
    }
  )
}

const wf = id => fetchRelated(id)

const artistWaterfall = (id, cb) => (
  async.waterfall(
    [
      fetchArtist(id),
      fetchRelated,
      fetchTracks,
    ],
    cb
  )
)

const fiddleWithSpotify = () => {
  async.map(
    ARTISTS,
    artistWaterfall,
    (err, res) => {
      const finalTrack = _.first(sortByPop(_.flatten(res)))
      console.log(finalTrack.name, finalTrack.popularity)}
  )
}

fiddleWithSpotify()
console.log('done');