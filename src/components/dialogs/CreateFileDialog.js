import React from 'react'

const CreateFileDialog = ({ onSave, onCancel }) => (
  <div>
    <p>Create File</p>
    <input></input>
    <div>
      <button onClick={() => onSave()}>Save</button>
      <button onClick={() => hideCreateFileDialog()}>Cancel</button>
    </div>
  </div>
)
