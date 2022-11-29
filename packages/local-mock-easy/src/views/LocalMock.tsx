/** @jsx h */
import { h, render } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { MOCK_KEY, URLREG, Status, Fast, defaultConfig } from '@/core/constants'
import { getStorage, setStorage, deleteStorage, debounce, getCurrentURLInfo } from '@/core/utils'
import styles from '@/core/styles'

const LocalMock = () => {
  const localConfigFromStorage = getStorage(MOCK_KEY) || defaultConfig
  const { key, state, entry, fast } = localConfigFromStorage

  const [localConfig, setLocalConfig] = useState(localConfigFromStorage)
  const [urlInfo, setUrlInfo] = useState('')
  const [errorInfo, setErrorInfo] = useState('')
  const [successInfo, setSuccessInfo] = useState('')
  const [inputEntry, setInputEntry] = useState(entry)

  useEffect(() => {
    const urlInfo = getCurrentURLInfo()
    setUrlInfo(urlInfo)
    initFastEntry(handleToggle)
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
          setSuccessInfo('Success!')
          // alert('ok')
          resolve('Success!')
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
          console.log('local-mock-easy is handle opened!')
          location.href = currentURL.href
        })
        .catch((error) => {
          console.log(error)
          searchParams.delete(key)
          // alert('开启失败, 获取不到入口文件！')
          console.log('local-mock-easy open fail!')
        })
    }
  }

  const handleFastModuleChange = () => {
    console.log('fast', fast)
    if (fast === Fast.ON) {
      setLocalConfig({ ...localConfig, fast: Fast.OFF })
      setStorage(MOCK_KEY, { ...localConfig, fast: Fast.OFF })
    } else {
      setLocalConfig({ ...localConfig, fast: Fast.ON })
      setStorage(MOCK_KEY, { ...localConfig, fast: Fast.ON })
    }

    initFastEntry(handleToggle)
  }

  return (
    <div style={styles.LocalMockWrapper}>
      {/* Content */}
      <div style={styles.LocalMockContent}>
        <div style={styles.LocalMockItem}>
          <span>连接状态：</span>
          <span>{state === Status.ON ? 'ON' : 'OFF'}</span>
        </div>
        <div style={styles.LocalMockItem}>
          <span>快捷模式：</span>
          <span>{fast === Fast.ON ? 'ON' : 'OFF'}</span>
          <button style={styles.LocalMockButtonFast} onClick={debounce(handleFastModuleChange, 300)}>
            切换
          </button>
        </div>
        <div style={styles.LocalMockItem}>
          <span>本地地址：</span>
          <input style={styles.LocalMockInput} value={inputEntry} onInput={(e: any) => setInputEntry(e.target.value)} />
          <button style={styles.LocalMockButtonOK} onClick={debounce(handlePing, 300)}>
            Ping
          </button>
        </div>
        <div>
          {errorInfo ? <span style={styles.LocalMockError}>{errorInfo}</span> : null}
          {successInfo ? <span style={styles.LocalMockSuccess}>{successInfo}</span> : null}
        </div>
        <div style={styles.LocalMockItem}>
          <textarea value={urlInfo} rows={10} readOnly style={styles.LocalMockTextarea}></textarea>
        </div>
      </div>
      {/* Tools */}
      <div style={styles.LocalMockFooter}>
        <button
          style={{ ...styles.LocalMockButtonFooter, ...styles.LocalMockButtonPrimary }}
          onClick={debounce(handleToggle, 300)}
        >
          <span>{state === Status.ON ? '关闭本地调试' : '开启本地调试'}</span>
        </button>
        <button style={styles.LocalMockButtonFooter} onClick={() => deleteStorage(MOCK_KEY)}>
          清除localStorage
        </button>
      </div>
    </div>
  )
}
let __window
export const renderLocalMock = (dom) => {
  __window = window
  render(<LocalMock />, dom)
}

export function initFastEntry(changeStateHandle) {
  const document = __window.document
  const id = 'local-mock-entry-fast-btn'
  const data = getStorage(MOCK_KEY) || defaultConfig
  const $ele = document.getElementById(id)
  if (data.fast !== Fast.ON) {
    if ($ele && document) {
      console.log('document', document)
      $ele.parentNode.removeChild($ele)
    }
    return
  }

  const toLocalBtn = document.getElementById(id) || document.createElement('div')
  toLocalBtn.id = id
  toLocalBtn.draggable = true
  toLocalBtn.innerHTML = data.state == Status.ON ? '退出本地调试' : '开启本地调试'
  toLocalBtn.setAttribute(
    'style',
    'cursor:pointer;color:#5f6368ff;background-color:rgba(153, 204, 255, .8);font-size:14px;position: fixed;padding:5px 10px;border-radius:0 0 10px 10px',
  )

  document.body.appendChild(toLocalBtn)

  toLocalBtn.addEventListener('click', () => {
    changeStateHandle && changeStateHandle()
  })

  toLocalBtn.style.left = '20px'
  toLocalBtn.style.top = '0px'
}

export default LocalMock
