import { useState, useRef } from 'react'

export default function Uploader({ onImage }) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef()

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return
    const url = URL.createObjectURL(file)
    onImage(file, url)
  }

  function onDrop(e) {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  return (
    <div
      className={`uploader ${dragging ? 'dragging' : ''}`}
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={e => handleFile(e.target.files[0])}
      />
      <div className="uploader-inner">
        <div className="uploader-icon-wrap">
          <span className="uploader-ring" />
          <span className="uploader-icon">👕</span>
        </div>
        <p className="uploader-title">Drop your fit here</p>
        <p className="uploader-sub">
          Drag & drop or click to browse
          <span>JPG · PNG · WEBP</span>
        </p>
      </div>
    </div>
  )
}
