/** @jsx h */
import { h, render } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { MOCK_KEY, URLREG, Status, Fast, defaultConfig, Mode, ModeDes, clientFlag } from '@/core/constants'
import { getStorage, setStorage, deleteStorage, debounce, getCurrentURLInfo } from '@/core/utils'
import styles from '@/views/localMockStyles'
import FastEntry from './FastEntry'

const LocalMock = () => {
  const localConfigFromStorage = getStorage(MOCK_KEY) || defaultConfig
  const [localConfig, setLocalConfig] = useState(localConfigFromStorage)
  const { key, state, entry, fast, mode } = localConfig
  const [urlInfo, setUrlInfo] = useState('')
  const [errorInfo, setErrorInfo] = useState('')
  const [successInfo, setSuccessInfo] = useState('')
  const [inputEntry, setInputEntry] = useState(entry)

  useEffect(() => {
    const urlInfo = getCurrentURLInfo()
    setUrlInfo(urlInfo)
    staticModeHandle()
    initFastEntry(handleToggle)
  }, [location.href])

  // handle with static mode
  const staticModeHandle = () => {
    if (mode !== Mode.Static || window[clientFlag] === true) {
      return
    }

    const currentURL = new URL(location.href)
    const { searchParams } = currentURL
    const target = searchParams.get(key)
    if (target) {
      fetch(target).then((obj) => {
        obj.text().then((text) => {
          const newText = text.replace('<head>', `<head><script>var ${clientFlag} = true</script>`)
          window.document.open()
          window.document.write(newText)
          window.document.close() // ensure document.readyState = "complete"
        })
      })
    }
  }
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
          resolve('Success!')
        })
        .catch(() => {
          setErrorInfo('获取不到入口文件！')
          setSuccessInfo('')
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

  const modeChange = (mode) => {
    setLocalConfig({ ...localConfig, mode })
    setStorage(MOCK_KEY, { ...localConfig, mode })
  }

  // 点击切换按钮
  const handleToggle = () => {
    const currentURL = new URL(location.href)
    const { searchParams } = currentURL
    if (state === Status.ON) {
      setStorage(MOCK_KEY, { ...localConfig, state: Status.OFF })
      searchParams.delete(key)
      location.href = currentURL.href
    } else {
      ping()
        .then(() => {
          setStorage(MOCK_KEY, { ...localConfig, state: Status.ON, entry: inputEntry })
          searchParams.set(key, inputEntry)
          console.log('local-mock-easy is handle opened!')
          location.href = currentURL.href
        })
        .catch((error) => {
          console.log(error)
          searchParams.delete(key)
          console.log('local-mock-easy open fail!')
        })
    }
  }

  const handleFastModuleChange = () => {
    if (fast === Fast.ON) {
      setLocalConfig({ ...localConfig, fast: Fast.OFF })
      setStorage(MOCK_KEY, { ...localConfig, fast: Fast.OFF })
    } else {
      setLocalConfig({ ...localConfig, fast: Fast.ON })
      setStorage(MOCK_KEY, { ...localConfig, fast: Fast.ON })
    }
  }

  return (
    <div style={styles.LocalMockWrapper}>
      <div style={styles.LocalMockContent}>
        <div style={styles.LocalMockItem}>
          <span>连接状态：</span>
          <span>{state === Status.ON ? 'ON' : 'OFF'}</span>
        </div>
        <div style={styles.LocalMockItem}>
          <span>快捷入口：</span>
          <span>{fast === Fast.ON ? 'ON' : 'OFF'}</span>
          <button style={styles.LocalMockButtonFast} onClick={debounce(handleFastModuleChange, 300)}>
            切换
          </button>
        </div>
        <div style={styles.LocalMockItem}>
          <span>调试模式：</span>
          <div>
            <input
              type="radio"
              id="agent"
              name="local-mock-mode"
              checked={mode === Mode.Agent}
              onClick={() => modeChange(Mode.Agent)}
            />
            <label htmlFor="agent">{ModeDes.Agent}</label>
          </div>
          <div>
            <input
              type="radio"
              id="static"
              name="local-mock-mode"
              checked={mode === Mode.Static}
              onClick={() => modeChange(Mode.Static)}
            />
            <label htmlFor="static">{ModeDes.Static}</label>
          </div>
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

export const renderLocalMock = (dom) => {
  render(<LocalMock />, dom)
}

export function initFastEntry(changeStateHandle) {
  const data = getStorage(MOCK_KEY) || defaultConfig
  const id = 'local-mock-entry-fast-content'
  const $el = document.getElementById(id) || document.createElement('div')
  document.body.appendChild($el)

  render(<FastEntry state={data.state} fast={data.fast} onChange={changeStateHandle} />, $el)
}

export default LocalMock
