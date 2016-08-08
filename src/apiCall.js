import fetch from 'isomorphic-fetch'

const ADDR = 'https://api.spotify.com/v1/'

const doFetch = (endpoint, options) => (
  fetch(ADDR + endpoint, options))

// const apiGet = route => cb => (
//   // fetch(ADDR.concat(route))
//   //   .then((err, res) => {
//   //     if (err) { return cb(err) }
//   //     console.log(route);
//   //     if (res.status >= 400) { return cb(res.status) }
//   //     return res.json()
//   //   })
//   //   .then(json => cb(null, json))
// )

const throwIfBad = (res) => {
  if (res.status >= 400 || res.status < 200) { throw res }
}

const apiGet = endpoint => cb => {
  console.log(`Fetch called with ${endpoint}`)
  doFetch(endpoint)
    .then(
      res => (throwIfBad(res), res.json()))
    .then(json => cb(null, json))
    .catch(res => cb(res.status, res.statusText))
}

export default apiGet
