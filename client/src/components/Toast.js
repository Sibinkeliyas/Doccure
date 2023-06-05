import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToastNotification() {

//   const toastDark = () => toast.dark('This is Toast Notification for Dark');
//   const toastInfo = () => toast.info('This is Toast Notification for Info');
//   const toastSuccess = () => toast.success('This is Toast Notification for Success');
//   const toastWarn = () => toast.warn('This is Toast Notification for Warn');
//   const toastError = () => toast.error('This is Toast Notification for Error');

  return (
        <>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
      />
        </>
  );
}
export default ToastNotification;