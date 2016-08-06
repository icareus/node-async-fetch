import 'isomorphic-fetch'

const ADDR = 'https://api.spotify.com/v1/'

const apiGet = route => cb => (
  fetch(ADDR.concat(route))
    .then(res => {
      console.log(res.status);
      if (res.status >= 400) { return cb(res.status) }
      return res.json()
    }).then(json => cb(null, json))
)

export default apiGet
