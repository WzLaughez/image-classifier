import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ImageClassifier from './ImageClassifier'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ImageClassifier />
    </>
  )
}

export default App
