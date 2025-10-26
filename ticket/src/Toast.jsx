// Toast.jsx
import React from 'react'
import { CToast, CToastBody, CToastClose, CToaster } from '@coreui/react'

export const Toast = ({ toastDisplay }) => {
  return (
    <CToaster>
      <CToast 
        autohide 
        visible={toastDisplay.display} 
        className={`toast-bar align-items-center position-fixed text-white ${toastDisplay.type === "success" ? "bg-success" : "bg-danger"}`}
      >
        <div className="d-flex">
          <CToastBody>{toastDisplay.message}</CToastBody>
          <CToastClose className="me-2 m-auto" />
        </div>
      </CToast>
    </CToaster>
  )
}
