import { useState } from 'react';
import PomodoroTable from './PomodoroTable'
import PomodoroSummary from './PomodoroSummary'
import PomodoroChart from './PomodoroChart'
import PomodoroForm from './PomodoroForm'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

   return (
    <div className="container col-lg-10">
      <h1 className="text-center mb-4">Pomodoro Data</h1>
      <button className="btn btn-primary mb-3" onClick={() => setIsModalOpen(true)}>
        Create Pomodoro
      </button>
      {isModalOpen && <PomodoroForm onClose={() => setIsModalOpen(false)} />}
      <div className="row d-flex ">
        <div className='col-sm-12 col-md-6 py-2'>
          <PomodoroChart />
        </div>
        <div className='col-sm-12 col-md-6 py-2'>
          <PomodoroSummary />
        </div>
      </div>
      <PomodoroTable />
    </div>
  )
}

export default App
