import React from 'react'
import { Toaster } from 'react-hot-toast'
import AccessFormWizard from './component/AccessFormWizard'
import { createBrowserRouter, RouterProvider } from 'react-router'
import RequestData from './Pages/RequestData'


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AccessFormWizard />,
    },
    {
      path: "/request-data",
      element: <RequestData />,
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />,
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default App