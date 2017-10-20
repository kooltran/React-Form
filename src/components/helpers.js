// class HelperRouter {
//   fetchToken() {
//     return fetch('https://express-auth-crud-api.herokuapp.com/login', {
//       method: 'get'
//     })
//     .then(res => console.log(res));
//   }
// }

export function request(url, method, params) {
  return fetch(url, {
    method,
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
