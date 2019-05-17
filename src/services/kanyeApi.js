const BASE_URL = 'https://api.kanye.rest/';

export function getKanyeQuote() {
  return fetch(BASE_URL)
    .then(res => {
      return [res.ok, res.json()];
    })
    .then(([ok, body]) => {
      if(!ok) throw 'Unable to get Kanye';
      return body;
    });
}
