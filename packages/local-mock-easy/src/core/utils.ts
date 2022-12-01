import { VConsoleLocalMockWrapper } from '../views/localMockStyles'

export const getStorage = (key) => {
  try {
    const data = window.localStorage.getItem(key)
    return JSON.parse(data)
  } catch (error) {
    console.log(error)
  }
}

export const setStorage = (key, val) => {
  window.localStorage.setItem(key, val)
  try {
    const data = JSON.stringify(val)
    window.localStorage.setItem(key, data)
  } catch (error) {
    console.log(error)
  }
}

export const deleteStorage = (key) => window.localStorage.removeItem(key)

export function debounce(fn, wait) {
  let timeout = null
  return function (...args) {
    const context = this
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(function () {
      fn.apply(context, args)
    }, wait)
  }
}

export const getCurrentURLInfo = () => {
  try {
    const currentURL = new URL(location.href)
    const { href, origin, pathname, searchParams } = currentURL
    const query = {}
    searchParams.forEach((val, key) => {
      query[key] = val
    })
    return JSON.stringify({ href, origin, pathname, query }, null, 2)
  } catch (error) {
    console.log(error)
  }
}

export const createVConsoleWrapper = () => {
  const localMockDom = document.createElement('div')
  Object.assign(localMockDom.style, VConsoleLocalMockWrapper)
  return localMockDom
}

export const pxToNum = function (str) {
  return parseFloat(str.replace('px', ''))
}
