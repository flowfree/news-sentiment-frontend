import React from 'react'
import { 
  Routes, 
  Route,
  Navigate,
} from 'react-router-dom'
import NewsURLInput from './features/data-labeling/NewsURLInput'
import NewsList from './features/data-labeling/NewsList'

function App() {
  return (
    <div className="container mx-auto">
      <Routes>
        <Route path="/" element={<Navigate to="/data-labeling/add" replace={true} />} />
        <Route path="/data-labeling/add" element={<NewsURLInput />} />
        <Route path="/data-labeling/list" element={<NewsList />} />
      </Routes>
    </div>
  )
}

export default App
