import fetch from 'isomorphic-fetch'

const ADDR = 'https://api.spotify.com/v1/'

const doFetch = (endpoint, options) => (
  fetch(ADDR + endpoint, options))

const throwIfBad = (res) => {
  if (res.status >= 400 || res.status < 200) { throw res }
}

export const apiGet = endpoint => cb => {
  doFetch(endpoint)
    .then(
      res => (throwIfBad(res), res.json()))
    .then(json => cb(null, json))
    .catch(res => cb(res.status, res.statusText))
}

export const getTracks = id => apiGet(`artists/${id}/top-tracks?country=FR`)
export const getArtist = id => apiGet(`artists/${id}`)
export const getRelated = id => apiGet(`artists/${id}/related-artists`)
