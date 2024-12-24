import React from 'react'
import { createPortal } from 'react-dom'
import { CircularProgress } from '@mui/material'
import './LoadingOverlay.css'

interface LoadingOverlayProps {
  isVisible: boolean
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
}) => {
  if (!isVisible) return null

  return createPortal(
    <div className='container'>
      <div className='spinner'>
        <div
          style={{
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <CircularProgress style={{ color: 'white' }} />
          <span>Загрузка...</span>
        </div>
      </div>
    </div>,
    document.body
  )
}
