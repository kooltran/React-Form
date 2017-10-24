const headers = new Headers({
  'Content-Type': 'application/json',
  Accept: 'application/json'
})

export function request(url, method, params) {
  return fetch(url, {
    method,
    headers,
    ...params
  })
}

export function setLocalStorageItem(key, value) {
  if(localStorage) { // check broweser support
    localStorage.setItem(key, value);
  }
}

export function getLocalStorageItem(key) {
  if(localStorage) { // check broweser support
    return localStorage.getItem(key);
  }
}

export function clearLocaStorageItem(key) {
  if(localStorage) {
    return localStorage.removeItem(key);
  }
}
