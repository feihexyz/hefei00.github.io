import {github} from './api'

const store = {}
let issues = []

export function initFetch () {
  return github('issues').then(response => {
    cacheIssue(response.data)
  }).catch(error => {
    initFetch()
  })
}

function cacheIssue(issueList) {
  issueList.forEach(issue => {
    store[issue.id] = issue
  })
  issues = issueList
}

export function archives () {
  let year = undefined
  let issueYear = undefined
  let archive = []
  issues.forEach(issue => {
    issueYear = issue.created_at.slice(0,4)
    if (year !== issueYear) {
      year = issueYear
      archive.push(year)
    }
    archive.push(issue)
  })
  return archive
}

export function post (id) {
  return store[id]
}

export function blogs () {
  return issues.slice(0, 4)
}
