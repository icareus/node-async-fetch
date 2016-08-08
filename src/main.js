// author - Antoine Barbaroux

import async from 'async'
import apiGet from './apicall'
import ARTISTS from './artists'

console.log('starting\n', ARTISTS)

// const print = x => (console.log(x), x)

const fiddleWithSpotify = () => {
  async.series([
    cb => {
        setTimeout((cb) => {
        console.log('first', 'toto');
      }, 1000), cb(null, 1)},
    apiGet(`artists`),
    cb => {cb(3, 'the third errs')}
  ], console.log);
}

fiddleWithSpotify()
console.log('done');