import { MOCK_KEY, Status, defaultConfig } from '@/core/constants'
import { getStorage, setStorage } from '@/core/utils'

export const setup = (options = defaultConfig) => {
  options = Object.assign(defaultConfig, options)

  // 初始化本地配置
  const localOptions = getStorage(MOCK_KEY)
  if (!localOptions) {
    setStorage(MOCK_KEY, { ...options })
  }
  const { key } = getStorage(MOCK_KEY)

  const currentURL = new URL(location.href)
  const { searchParams } = currentURL
  const urlEntry = searchParams.get(key)

  if (urlEntry) {
    setStorage(MOCK_KEY, { ...getStorage(MOCK_KEY), state: Status.ON, entry: urlEntry })
  }

  console.log('最终的配置=', getStorage(MOCK_KEY))

  // 自动加上 localMock 参数
  if (getStorage(MOCK_KEY).state === Status.ON) {
    const entry = getStorage(MOCK_KEY).entry
    console.log('Try to fetch entry -> ', entry)
    fetch(entry)
      .then(() => {
        searchParams.set(key, entry)
        console.log('local-mock-easy is auto opened!')
      })
      .catch((error) => {
        console.log(error)
        searchParams.delete(key)
        console.log('local-mock-easy is auto closed!')
        setStorage(MOCK_KEY, { ...getStorage(MOCK_KEY), state: Status.OFF })
      })
      .finally(() => {
        if (location.href !== currentURL.href) {
          location.href = currentURL.href
        }
      })
  }
}
