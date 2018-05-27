import React from 'react'
import MarkdownIt from 'markdown-it'
import hljs from 'highlightjs'
import katex from 'katex'
import texmatch from 'markdown-it-texmath'
import '../styles/markdown-preview.css'
import '../styles/monokai.css'
import 'katex/dist/katex.css'

const renderMarkdown = (code) => {
  const md = new MarkdownIt({
    typographer: true,
    html: true,
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            '</code></pre>'
        } catch (__) {}
      }
      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    }
  }).use(texmatch.use(katex), {delimiters:'dollars'})
  return {
    __html: md.render(code)
  }
}

const MarkdownPreview = ({ code, changeMode }) => (
  <div 
    onClick={() => changeMode()}
    className='markdown-preview'>
    <div className='preview'>
      <div className='wrapper' dangerouslySetInnerHTML={renderMarkdown(code)}/>
    </div>
  </div>
)

export default MarkdownPreview
