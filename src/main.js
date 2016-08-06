// author - Antoine Barbaroux

import async from 'async'
import apiGet from './apiCall'
import ARTISTS from './artists'

console.log('starting\n', ARTISTS)


const fiddleWithSpotify = () => {
  async.parallel([
    cb => {
        setTimeout((cb) => {
        console.log('first', 'toto');
      }, 1000), cb},
    apiGet('artists/' + ARTISTS[0]),
    cb => {cb(null, 1)}

  ], console.log);
}

fiddleWithSpotify()
console.log('done');