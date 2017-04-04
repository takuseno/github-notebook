import React from 'react'
import MarkdownIt from 'markdown-it'

const renderMarkdown = (code) => {
  const md = new MarkdownIt()
  return {
    __html: md.render(code)
  }
}

const MarkdownPreview = ({ code }) => (
  <div dangerouslySetInnerHTML={renderMarkdown(code)}>
  </div>
)

export default MarkdownPreview
