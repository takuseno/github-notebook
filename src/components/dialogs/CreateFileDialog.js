import React from 'react'

const CreateFileDialog = ({ isShowed, onSave, onCancel }) => (
  <div className={isShowed ? '' : 'hidden'}>
    <p>Create File</p>
    <input></input>
    <div>
      <button onClick={() => onSave()}>Save</button>
      <button onClick={() => onCancel()}>Cancel</button>
    </div>
  </div>
)

export default CreateFileDialog
