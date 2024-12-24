import React from 'react'
import { createPortal } from 'react-dom'
import { Loading } from 'react-admin'
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
        <Loading />
      </div>
    </div>,
    document.body
  )
}
