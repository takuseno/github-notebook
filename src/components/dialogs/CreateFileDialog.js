import React from 'react'

class CreateFileDialog extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      fileName: ''
    }
  }

  onFileNameChange (fileName) {
    this.setState({fileName: fileName})
  }

  render () {
    const isShowed = this.props.isShowed
    const onSave = this.props.onSave
    const onCancel = this.props.onCancel
    return (
      <div className={isShowed ? '' : 'hidden'}>
        <p>Create File</p>
        <input onChange={(e) => this.onFileNameChange(e.target.value)}></input>
        <div>
          <button onClick={() => onSave(this.state.fileName)}>Save</button>
          <button onClick={() => onCancel()}>Cancel</button>
        </div>
      </div>
    )
  }
}

export default CreateFileDialog
