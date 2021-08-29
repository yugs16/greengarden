import fetchHeaders from '../utils/fetchHeaders'

const config = {
  apiUrl: 'base'
}
export const AuthServices = {
  login,
  logout,
  register
}

export const ApiServices = {
  fetchCollection,
  fetchRecord,
  updateRecord,
  addRecord: updateRecord
  // deleteRecord
}

function login(email, pwd) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, pwd })
  }

  return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user))
      }

      return user
    })
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user')
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }

  return fetch(`${config.apiUrl}/users/register`, requestOptions).then(
    handleResponse
  )
}

function fetchCollection(url, params) {
  const requestOptions = {
    method: 'GET',
    headers: fetchHeaders(),
    params: params
  }

  return fetch(`${config.apiUrl}${url}`, requestOptions).then(handleResponse)
}

function fetchRecord(url, id, params) {
  const requestOptions = {
    method: 'GET',
    headers: fetchHeaders(),
    params: params
  }

  return fetch(`${config.apiUrl}${url}/${id}`, requestOptions).then(
    handleResponse
  )
}

function updateRecord(url, payload) {
  const method = payload.id ? 'PUT' : 'POST'
  const requestOptions = {
    method,
    headers: { ...fetchHeaders(), 'Content-Type': 'application/json' },
    body: payload
  }

  return fetch(`${config.apiUrl}${url}`, requestOptions).then(handleResponse)
}

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//   const requestOptions = {
//     method: 'DELETE',
//     headers: authHeader()
//   }

//   return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(
//     handleResponse
//   )
// }

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout()
        location.forceReload(true)
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}
