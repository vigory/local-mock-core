export const commonStyle = {
  boxSizing: 'border-box',
}

export const LocalMockWrapper = {
  ...commonStyle,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
}

export const LocalMockContent = {
  ...commonStyle,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  flex: 1,
}

export const LocalMockItem = {
  ...commonStyle,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  minHeight: '40px',
  padding: '0 10px',
  marginTop: '10px',
}

export const LocalMockFooter = {
  ...commonStyle,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '60px',
  padding: '10px',
  background: '#f3f3f3',
}

export const LocalMockTextarea = {
  ...commonStyle,
  width: '100%',
  minWidth: '100%',
  minHeight: '60px',
  maxHeight: '240px',
  padding: '10px',
}

export const LocalMockError = {
  color: '#ff4d4f',
  marginLeft: '10px',
}

export const LocalMockSuccess = {
  color: '#52c41a',
  marginLeft: '10px',
}

export const LocalMockInput = {
  flex: 1,
  minHeight: '20px',
  padding: '5px 10px',
  marginRight: '12px',
}

export const LocalMockButton = {
  display: 'inline-block',
  padding: '8px 10px',
  border: '1px solid transparent',
  borderRadius: '1000px',
  borderColor: '#d9d9d9',
  backgroundColor: '#ffffff',
}

export const LocalMockButtonOK = {
  ...LocalMockButton,
  padding: '8px 20px',
}

export const LocalMockButtonPrimary = {
  ...LocalMockButton,
  color: '#ffffff',
  borderColor: '#1890ff',
  backgroundColor: '#1890ff',
}

export const LocalMockButtonFooter = {
  ...LocalMockButton,
  flex: 1,
  margin: '0 10px',
}

export const VConsoleLocalMockWrapper = {
  ...commonStyle,
  overflow: 'hidden',
  position: 'absolute',
  inset: 0,
}

const styles = {
  LocalMockWrapper,
  LocalMockContent,
  LocalMockItem,
  LocalMockFooter,
  LocalMockTextarea,
  LocalMockError,
  LocalMockSuccess,
  LocalMockInput,
  LocalMockButton,
  LocalMockButtonOK,
  LocalMockButtonPrimary,
  LocalMockButtonFooter,
  VConsoleLocalMockWrapper,
}

export default styles
