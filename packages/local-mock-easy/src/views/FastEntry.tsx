/** @jsx h */
import { h } from 'preact'
import { Fast, MOCK_KEY, Status } from '@/core/constants'
import Draggabilly from 'draggabilly'
import { useEffect, useRef, useState } from 'preact/hooks'
import { fastEntryBtn } from './fastEntryStyles'
import { getStorage, setStorage } from '@/core/utils'

const defaultPos = { left: '10px', top: 0 }
const FastEntry = (props) => {
  const localConfigFromStorage = getStorage(MOCK_KEY) || {}
  const [pointerEvents, setPointerEvents] = useState('all')
  const [pos, setPos] = useState(localConfigFromStorage.pos || defaultPos)
  const fastEntryEl = useRef(null)
  const { fast, state, onChange } = props
  const id = 'local-mock-entry-fast-btn'

  useEffect(() => {
    window.addEventListener('resize', () => initDraggabilly())
  })
  useEffect(() => {
    if (fast === Fast.ON) {
      initDraggabilly()
    }
  }, [fast])

  const initDraggabilly = () => {
    const draggabilly = new Draggabilly(fastEntryEl.current)

    draggabilly.on('dragStart', () => {
      setPointerEvents('none')
    })

    draggabilly.on('dragEnd', () => {
      setPointerEvents('all')
      const newPos = {
        left: fastEntryEl.current.offsetLeft + 'px',
        top: fastEntryEl.current.offsetTop + 'px',
      }
      setPos(newPos)
      setStorage(MOCK_KEY, { ...localConfigFromStorage, pos: newPos })
    })
  }
  const clickBtn = () => {
    onChange()
  }

  return fast === Fast.ON ? (
    <div style={{ ...fastEntryBtn, ...pos, pointerEvents }} id={id} ref={fastEntryEl} onClick={clickBtn}>
      <span>{state === Status.ON ? '退出调试' : '开启调试'}</span>
    </div>
  ) : null
}
export default FastEntry
