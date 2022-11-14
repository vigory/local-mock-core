/** @jsx h */
import { h, render } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { MOCK_KEY, URLREG, Status, defaultConfig } from '@/core/constants'
import { getStorage, setStorage, deleteStorage, debounce, getCurrentURLInfo } from '@/core/utils'
import styles from '@/core/styles'

const LocalMock = () => {
  const localConfig = getStorage(MOCK_KEY) || defaultConfig
  const { key, state, entry } = localConfig

  const [urlInfo, setUrlInfo] = useState('')
  const [errorInfo, setErrorInfo] = useState('')
  const [successInfo, setSuccessInfo] = useState('')
  const [inputEntry, setInputEntry] = useState(entry)

  useEffect(() => {
    const urlInfo = getCurrentURLInfo()
    setUrlInfo(urlInfo)
  }, [location.href])

  const ping = () => {
    return new Promise((resolve, reject) => {
      if (!URLREG.test(inputEntry)) {
        setErrorInfo('无效地址！')
        setSuccessInfo('')
        reject(new Error('Invalid entry url!'))
      }
      console.log('Try to fetch inputEntry -> ', inputEntry)
      fetch(inputEntry)
        .then(() => {
          setErrorInfo('')
          setSuccessInfo('ok')
          // alert('ok')
          resolve('ok')
        })
        .catch(() => {
          setErrorInfo('获取不到入口文件！')
          setSuccessInfo('')
          // alert('Can not fetch entry url!')
          reject(new Error('Can not fetch entry url!'))
        })
    })
  }

  // 点击 ping 按钮
  const handlePing = () => {
    ping().catch((error) => {
      console.log(error)
    })
  }

  // 点击切换按钮
  const handleToggle = () => {
    const currentURL = new URL(location.href)
    const { searchParams } = currentURL
    if (state === Status.ON) {
      // 关闭后刷新
      setStorage(MOCK_KEY, { ...localConfig, state: Status.OFF })
      searchParams.delete(key)
      location.href = currentURL.href
    } else {
      ping()
        .then(() => {
          setStorage(MOCK_KEY, { ...localConfig, state: Status.ON, entry: inputEntry })
          searchParams.set(key, inputEntry)
          // alert('手动开启成功')
          location.href = currentURL.href
        })
        .catch((error) => {
          console.log(error)
          searchParams.delete(key)
          // alert('开启失败, 获取不到入口文件！')
          location.href = currentURL.href
        })
    }
  }

  return (
    <div style={styles.LocalMockWrapper}>
      {/* Content */}
      <div style={styles.LocalMockContent}>
        <div style={styles.LocalMockItem}>
          <textarea value={urlInfo} rows={10} readOnly style={styles.LocalMockTextarea}></textarea>
        </div>
        <div style={styles.LocalMockItem}>
          <span>连接状态：</span>
          <span>{state === Status.ON ? 'On' : 'Off'}</span>
          {errorInfo ? <span style={styles.LocalMockError}>{errorInfo}</span> : null}
          {successInfo ? <span style={styles.LocalMockSuccess}>{successInfo}</span> : null}
        </div>
        <div style={styles.LocalMockItem}>
          <input
            style={styles.LocalMockInput}
            value={inputEntry}
            onChange={(e: any) => setInputEntry(e.target.value)}
          />
          <button style={styles.LocalMockButtonOK} onClick={debounce(handlePing, 300)}>
            Ping
          </button>
        </div>
      </div>
      {/* Tools */}
      <div style={styles.LocalMockFooter}>
        <button
          style={{ ...styles.LocalMockButtonFooter, ...styles.LocalMockButtonPrimary }}
          onClick={debounce(handleToggle, 300)}
        >
          开启/关闭
        </button>
        <button style={styles.LocalMockButtonFooter} onClick={() => deleteStorage(MOCK_KEY)}>
          清除localStorage
        </button>
      </div>
    </div>
  )
}

export const renderLocalMock = (dom) => {
  render(<LocalMock />, dom)
}

export default LocalMock
