import React, { useState } from 'react'
import { db } from '../db/db'

const ImportData = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isImporting, setIsImporting] = useState(false)
  const [message, setMessage] = useState('')

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    setSelectedFile(file || null)
    setMessage('')
  }

  const handleImport = async () => {
    if (!selectedFile) {
      setMessage('Please choose a backup file first.')
      return
    }

    try {
      setIsImporting(true)
      setMessage('')

      const fileText = await selectedFile.text()
      const parsed = JSON.parse(fileText)

      if (!parsed?.data) {
        throw new Error('Invalid backup file format.')
      }

      const exercises = Array.isArray(parsed.data.exercises) ? parsed.data.exercises : []
      const muscles = Array.isArray(parsed.data.muscles) ? parsed.data.muscles : []
      const exerciseMuscles = Array.isArray(parsed.data.exerciseMuscles) ? parsed.data.exerciseMuscles : []
      const history = Array.isArray(parsed.data.history) ? parsed.data.history : []

      await db.transaction(
        'rw',
        db.exercises,
        db.muscles,
        db.exerciseMuscles,
        db.history,
        async () => {
          await db.history.clear()
          await db.exerciseMuscles.clear()
          await db.muscles.clear()
          await db.exercises.clear()

          if (exercises.length) await db.exercises.bulkAdd(exercises)
          if (muscles.length) await db.muscles.bulkAdd(muscles)
          if (exerciseMuscles.length) await db.exerciseMuscles.bulkAdd(exerciseMuscles)
          if (history.length) await db.history.bulkAdd(history)
        }
      )

      setMessage('Import completed successfully.')
      setSelectedFile(null)
    } catch (error) {
      console.error('Import failed:', error)
      setMessage('Import failed. Please check that the file is a valid backup.')
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className="import-page">
      <div className="import-card">
        <h1 className="import-title">Import data</h1>
        <p className="import-text">
          Restore your workout data from a previously exported JSON backup file.
        </p>

        <label className="file-input-label">
          <span>{selectedFile ? selectedFile.name : 'Choose backup file'}</span>
          <input
            type="file"
            accept="application/json,.json"
            onChange={handleFileChange}
          />
        </label>

        <button
          className="import-btn"
          onClick={handleImport}
          disabled={isImporting}
        >
          {isImporting ? 'Importing...' : 'Import backup'}
        </button>

        <p className="import-warning">
          This will replace your current local data.
        </p>

        {message && <p className="import-message">{message}</p>}
      </div>
    </div>
  )
}

export default ImportData