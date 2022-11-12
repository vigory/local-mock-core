import { MiddlewareOptions } from 'types'

export const defaultConfig: MiddlewareOptions = {
  key: 'localMock',
  injectHtml: () => '',
}

export const generateTemplate = (entry, extraHtml) => {
  return `<html>
    <body>
      ${extraHtml}
      <script>
      try{
        function mock () {
          fetch('${entry}').then((obj)=>{
            obj.text().then((text)=>{
              document.open()
              document.write(text)
              document.close() // ensure document.readyState = "complete"
            })
          })
        }
        mock()
      } catch(e) {
        console.log(e);
      }
      </script>
    </body>
  </html>`
}
