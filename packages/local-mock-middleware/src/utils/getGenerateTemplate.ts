export default (target: string): string => {
  return `<html>
      <body>
        <head>
        </head>
        <script>
        try {
          function mock() {
            fetch('${target}').then((obj) => {
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
