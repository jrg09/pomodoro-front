import './App.css'
import PomodoroTable from './PomodoroTable'
import PomodoroSummary from './PomodoroSummary'
import PomodoroChart from './PomodoroChart'

function App() {

  return (
    <div className="container">
      <h1 className="text-center mb-4">Pomodoro Data</h1>
      <div className="row d-flex">
        <div className='col-6'>
          <PomodoroChart />
        </div>
        <div className='col-6'>
          <PomodoroSummary />
        </div>
      </div>
      <PomodoroTable />
    </div>
  )
}

export default App
