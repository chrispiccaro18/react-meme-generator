const BASE_URL = 'https://picsum.photos/500/300';

export function getRandomPhoto() {
  return fetch(BASE_URL)
    .then(res => {
      return [res.ok, res.url];
    })
    .then(([ok, url]) => {
      if(!ok) throw 'Unable to get random photo';
      return url;
    });
}
