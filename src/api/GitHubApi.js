import * as github from 'octonode'

const client = github.client('')

export const updateContents = (repository, file, content) => {
  return new Promise((resolve, reject) => {
    const message = `UPDATE ${file.path}`
    client.repo(repository)
      .updateContents(file.path, message, content, file.sha, (err, data, headers) => {
        resolve(data)
      })
  })
}

export const createContents = (repository, path) => {
  return new Promise((resolve, reject) => {
    const message = `CREATE ${path}`
    client.repo(repository).createContents(path, message, (err, data, headers) => {
      resolve(data)
    })
  })
}

export const deleteContents = (repository, file) => {
  return new Promise((resolve, reject) => {
    const message = `DELETE ${file.path}`
    client.repo(repository).deleteContents(file.path, message, file.sha, (err, data, headers) => {
      resolve(data)
    })
  })
}

export const getContents = (repository, file) => {
  return new Promise((resolve, reject) => {
    client.repo(repository).contents(file.path, (err, data, headers) => {
      resolve(data)
    }) 
  })
}

export const getFiles = (repository) => {
  return new Promise((resolve, reject) => {
    client.repo(repository).tree('master', (err, data, headers) => {
      resolve(data)
    }) 
  })
}
