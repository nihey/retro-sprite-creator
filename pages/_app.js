import React from 'react'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '../src/base.scss'

export default function App ({ Component, pageProps }) {
  return <>
    <Component {...pageProps} />
    <ToastContainer
      autoClose={2300}
      pauseOnFocusLoss={false}
    />
  </>
}
