import React, { useRef, useState } from 'react'
import { db } from '../db/db'

const BackupData = () => {
  const fileInputRef = useRef(null)
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [message, setMessage] = useState('')

  const handleExport = async () => {
    try {
      setIsExporting(true)
      setMessage('')

      const exercises = await db.exercises.toArray()
      const muscles = await db.muscles.toArray()
      const exerciseMuscles = await db.exerciseMuscles.toArray()
      const history = await db.history.toArray()

      const exportData = {
        exportedAt: new Date().toISOString(),
        app: 'gymApp',
        version: 1,
        data: {
          exercises,
          muscles,
          exerciseMuscles,
          history
        }
      }

      const jsonString = JSON.stringify(exportData, null, 2)
      const blob = new Blob([jsonString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = `gymApp-backup-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(url)

      setMessage('Export completed successfully.')
    } catch (error) {
      console.error('Export failed:', error)
      setMessage('Something went wrong while exporting your data.')
    } finally {
      setIsExporting(false)
    }
  }

  const handleImportClick = () => {
    setMessage('')
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0]

    if (!selectedFile) return

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
    } catch (error) {
      console.error('Import failed:', error)
      setMessage('Import failed. Please check that the file is a valid backup.')
    } finally {
      setIsImporting(false)
      e.target.value = ''
    }
  }

  return (
    <div className="backup-page">
      <div className="backup-card">
        <h1 className="backup-title">Backup</h1>
        <p className="backup-text">
          Export your local workout data to a file or import a previous backup.
        </p>

        <div className="backup-actions">
          <button
            className="backup-btn"
            onClick={handleExport}
            disabled={isExporting || isImporting}
          >
            {isExporting ? 'Exporting...' : 'Export'}
          </button>

          <button
            className="backup-btn backup-btn-secondary"
            onClick={handleImportClick}
            disabled={isExporting || isImporting}
          >
            {isImporting ? 'Importing...' : 'Import'}
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        <p className="backup-warning">
          Import will replace your current local data.
        </p>

        {message && <p className="backup-message">{message}</p>}
      </div>
    </div>
  )
}

export default BackupData