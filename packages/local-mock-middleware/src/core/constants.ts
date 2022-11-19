import { MiddlewareOptions } from 'types'

export const defaultConfig: MiddlewareOptions = {
  isOpen: false,
  key: 'localMock',
  injectHtml: () => '',
}

export const generateTemplate = (entry: string, extraHtml: string): string => {
  return `<html>
    <body>
      ${extraHtml}
      <script>
      try {
        function mock() {
          fetch('${entry}').then((obj) => {
            obj.text().then((text) => {
              document.open()
              document.write(text)
              document.close() // ensure document.readyState = "complete"
            })
          })
        }
        mock()
      } catch (e) {
        console.log(e)
      }
      </script>
    </body>
  </html>`
}
