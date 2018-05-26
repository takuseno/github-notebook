import * as github from 'octonode'
import * as SuperAgent from 'superagent'
import config from '../../config.json'

export const updateContents = (repository, file, content, token) => {
  return new Promise((resolve, reject) => {
    const message = `UPDATE ${file.path}`
    github.client(token).repo(repository)
      .updateContents(file.path, message, content, file.sha, (err, data, headers) => {
        resolve(data)
      })
  })
}

export const createContents = (repository, path, token) => {
  return new Promise((resolve, reject) => {
    const message = `CREATE ${path}`
    github.client(token)
      .repo(repository)
      .createContents(path, message, '', (err, data, headers) => {
      resolve(data)
    })
  })
}

export const deleteContents = (repository, file, token) => {
  return new Promise((resolve, reject) => {
    const message = `DELETE ${file.path}`
    github.client(token)
      .repo(repository)
      .deleteContents(file.path, message, file.sha, (err, data, headers) => {
      resolve(data)
    })
  })
}

export const getContents = (repository, file, token) => {
  return new Promise((resolve, reject) => {
    github.client(token)
      .repo(repository)
      .contents(file.path, (err, data, headers) => {
      resolve(data)
    }) 
  })
}

export const getFiles = (repository, token) => {
  return new Promise((resolve, reject) => {
    github.client(token)
      .repo(repository)
      .tree('master', (err, data, headers) => {
      resolve(data)
    }) 
  })
}

export const getOrganizations = (token) => {
  return new Promise((resolve, reject) => {
    github.client(token).me().orgs((err, data, headers) => {
      resolve(data)
    })
  })
}

export const getUserRepos = (token) => {
  let repos = []
  return new Promise((resolve, reject) => {
    Promise.resolve(undefined).then(function loop (page) {
      if (page === undefined) {
        page = 1
      }
      github.client(token)
        .me()
        .repos({page: page, type: 'owner'}, (err, data, headers) => {
        repos = repos.concat(data)
        if (data.length === 0) {
          resolve(repos)
        } else {
          loop(page + 1)
        }
      })
    })
  })
}

export const getOrgRepos = (org, token) => {
  let repos = []
  return new Promise((resolve, reject) => {
    Promise.resolve(undefined).then(function loop (page) {
      if (page === undefined) {
        page = 1
      }
      github.client(token).org(org).repos(page, (err, data, headers) => {
        repos = repos.concat(data)
        if (data.length === 0) {
          resolve(repos)
        } else {
          loop(page + 1)
        }
      })
    })
  })
}

export const getToken = (code) => {
  return new Promise((resolve, reject) => {
    SuperAgent.get(config.gatekeeper_url + '/' + code)
      .then(res => {
        resolve(res.body.token)
      })
  })
}

export const getInfo = (token) => {
  return new Promise((resolve, reject) => {
    github.client(token).me().info((err, data, headers) => {
      resolve(data)
    })
  })
}
