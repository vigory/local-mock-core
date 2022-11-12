import { MOCK_KEY, Status, defaultConfig } from '@/core/constants'
import { getStorage, setStorage } from '@/core/utils'

export const setup = (options = defaultConfig) => {
  options = Object.assign(defaultConfig, options)

  // 初始化本地配置
  const localOptions = getStorage(MOCK_KEY)

  if (!localOptions) {
    setStorage(MOCK_KEY, { ...options })
  }

  const localConfig = localOptions || options
  const { key, state, entry } = localConfig

  const currentURL = new URL(location.href)
  const { searchParams } = currentURL
  const urlEntry = searchParams.get(key)

  if (urlEntry) {
    setStorage(MOCK_KEY, { ...localConfig, state: Status.ON, entry: urlEntry })
  } else {
    // 自动加上 localMock 参数
    if (state === Status.ON) {
      console.log('Try to fetch entry -> ', entry)
      fetch(entry)
        .then(() => {
          searchParams.set(key, entry)
          // alert('自动开启成功')
          location.href = currentURL.href
        })
        .catch((error) => {
          console.log(error)
          setStorage(MOCK_KEY, { ...localConfig, state: Status.OFF })
          searchParams.delete(key)
          // alert('自动开启失败, 获取不到入口文件！')
          location.href = currentURL.href
        })
    }
  }
}
