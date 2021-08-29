let users = JSON.parse(localStorage.getItem('users')) || []

export function initBackend() {
  window.fetch = function(url, opts) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
          // get parameters from post request
          let params = JSON.parse(opts.body)

          // find if any user matches login credentials
          let filteredUsers = users.filter(user => {
            return user.email === params.email && user.pwd === params.pwd
          })

          if (filteredUsers.length) {
            // if login details are valid return user details and fake jwt token
            let user = filteredUsers[0]
            let responseJson = {
              id: user.id,
              email: user.email,
              name: user.name,
              token: 'fake-jwt-token'
            }
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(responseJson))
            })
          } else {
            // else return error
            reject('Username or password is incorrect')
          }

          return
        }

        // register user
        if (url.endsWith('/users/register') && opts.method === 'POST') {
          // get new user object from post body
          let newUser = JSON.parse(opts.body)

          // validation
          let duplicateUser = users.filter(user => {
            return user.email === newUser.email
          }).length
          if (duplicateUser) {
            reject('Username "' + newUser.email + '" is already taken')
            return
          }

          // save new user
          newUser.id = users.length
            ? Math.max(...users.map(user => user.id)) + 1
            : 1
          users.push(newUser)
          localStorage.setItem('users', JSON.stringify(users))

          // respond 200 OK
          resolve({
            ok: true,
            text: () => Promise.resolve(JSON.stringify(newUser))
          })

          return
        }

        // get user by id
        if (url.endsWith('loans') && opts.method === 'GET') {
          // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
          if (
            opts.headers &&
            opts.headers.Authorization === 'Bearer fake-jwt-token'
          ) {
            const _urlParts = url.split('/')
            const addFor = _urlParts.pop()
            const accountId = _urlParts[2]
            const found = users.find(user => user.id == accountId)

            if (!found) reject('User not found!')
            const result = localStorage.getItem(addFor)
            let newItems = JSON.parse(result) || []

            newItems = newItems.filter(item => item.account == accountId)
            // respond 200 OK with user
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(newItems))
            })
          } else {
            // return 401 not authorised if token is null or invalid
            reject('Unauthorised')
          }

          return
        }

        if (url.endsWith('loans') && opts.method === 'POST') {
          // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
          if (
            opts.headers &&
            opts.headers.Authorization === 'Bearer fake-jwt-token'
          ) {
            // find user by id in users array
            const _urlParts = url.split('/')
            const addFor = _urlParts.pop()
            const accountId = _urlParts[2]
            const found = users.find(user => user.id == accountId)

            if (!found) reject('User not found!')
            if (!opts.body) reject('Bad Request!')
            const newItems = JSON.parse(localStorage.getItem(addFor)) || []
            newItems.push({
              ...opts.body,
              account: accountId,
              id: newItems.length + 1
            })

            localStorage.setItem(addFor, JSON.stringify(newItems))

            // respond 200 OK
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(newItems))
            })
          } else {
            // return 401 not authorised if token is null or invalid
            reject('Unauthorised')
          }

          return
        }

        if (url.endsWith('repayments') && opts.method === 'PUT') {
          // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
          if (
            opts.headers &&
            opts.headers.Authorization === 'Bearer fake-jwt-token'
          ) {
            // find user by id in users array
            const parts = url.split('/')
            const accId = parts[2]
            const _user = users.find(user => {
              return user.id == parseInt(accId)
            })

            if (!_user) reject('User not found!')
            if (!opts.body) reject('Bad Request!')
            let items = JSON.parse(localStorage.getItem('loans')) || []

            const index = items.findIndex(item => item.id == opts.body.id)
            const item = items[index]
            item.numberOfRepayments = 0
            item.status = 'paid'
            items[index] = item

            localStorage.setItem('loans', JSON.stringify(items))

            // respond 200 OK
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(item))
            })
          } else {
            // return 401 not authorised if token is null or invalid
            reject('Unauthorised')
          }

          return
        }
      }, 500)
    })
  }
}
