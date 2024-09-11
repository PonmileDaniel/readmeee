// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import UploadDocumentPage from './Pages/UploadDocumentPage'
// import Chat from './Pages/Chat'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div>
//       <UploadDocumentPage />
//     </div>
//   )
// }

// export default App

import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UploadDocumentPage from './Pages/UploadDocumentPage'
import Chat from './Pages/Chat'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<UploadDocumentPage />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App