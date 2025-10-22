import './App.css'

import { FiltersProvider } from './context/FiltersContext'

import DataDisplay from './components/DataDisplay'
import SetQuestions from './components/SetQuestions'

function App() {
  return (
    <>
      <h1>Country Data</h1>
      <SetQuestions />
      <FiltersProvider>
        <DataDisplay />
      </FiltersProvider>
    </>
  )
}

export default App
