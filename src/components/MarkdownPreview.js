import React from 'react'
import MarkdownIt from 'markdown-it'
import MarkdownHighlight from 'markdown-it-highlightjs'
import MarkdownMath from 'markdown-it-math'
import '../styles/markdown-preview.css'
import '../styles/monokai.css'

const renderMarkdown = (code) => {
  const md = new MarkdownIt({
    typographer: true,
    html: true,
  }).use(MarkdownHighlight)
    .use(MarkdownMath, {
      inlineOpen: '\\(',
      inlineClose: '\\)',
      blockOpen: '\\[',
      blockClose: '\\]'
    })
  return {
    __html: md.render(code)
  }
}

const MarkdownPreview = ({ code }) => (
  <div 
    className='markdown-preview'
    dangerouslySetInnerHTML={renderMarkdown(code)}>
  </div>
)

export default MarkdownPreview
