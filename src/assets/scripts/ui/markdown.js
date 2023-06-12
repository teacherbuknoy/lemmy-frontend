const MarkdownIt = require('markdown-it')
const DOMPurify = require('dompurify')

function fixHeadings(str, decreaseBy = 1) {
  return str
    .replace(/h6/gm, `h${6 + decreaseBy}`)
    .replace(/h5/gm, `h${5 + decreaseBy}`)
    .replace(/h4/gm, `h${4 + decreaseBy}`)
    .replace(/h3/gm, `h${3 + decreaseBy}`)
    .replace(/h2/gm, `h${2 + decreaseBy}`)
    .replace(/h1/gm, `h${1 + decreaseBy}`)
}

function render(str) {
  const md = new MarkdownIt()
  const html = md.render(str)

  const purifiedHtml = DOMPurify.sanitize(html)

  return purifiedHtml
}

export { render, fixHeadings }