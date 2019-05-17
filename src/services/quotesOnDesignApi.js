const RANDOM_URL = 'https://api.adviceslip.com/advice';

export function getRandomQuote() {
  return fetch(RANDOM_URL)
    .then(res => {
      return [res.ok, res.json()];
    })
    .then(([ok, body]) => {
      if(!ok) throw 'Unable to get random quote';
      return body;
    });
}
