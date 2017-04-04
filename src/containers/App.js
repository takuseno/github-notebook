import React from 'react'
import { connect } from 'react-redux'
import { saveFile, updateFile, clickFile, loadFiles } from '../actions'
import Editor from '../components/Editor'
import Filer from '../components/Filer'

class App extends React.Component {
  componentDidMount () {
    const { repository, dispatch } = this.props
    dispatch(loadFiles(repository))
  }

  render () {
    const { files, repository, currentFile, currentContent, dispatch } = this.props
    return (
      <div>
        <Filer
          files={files}
          onClick={(file) => dispatch(clickFile(repository, file))}>
        </Filer>
        <Editor
          content={currentContent}
          onUpdated={(content) => dispatch(updateFile(currentFile, content))}
          onSaved={(content) => dispatch(saveFile(repository, currentFile, content))}>
        </Editor>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    files: state.files,
    repository: state.repository,
    currentContent: state.currentContent,
    currentFile: state.currentFile
  }
}

export default connect(mapStateToProps)(App)
