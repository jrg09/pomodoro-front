
import { useState } from 'react';

const PomodoroForm = ({ onClose }) => {
  const toLocalISOString = (date) => {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
    return adjustedDate.toISOString().slice(0, 16);
  };

  const [start, setStart] = useState(toLocalISOString(new Date()));
  const [end, setEnd] = useState(toLocalISOString(new Date()));
  const [type, setType] = useState('Pomodoro');
  const [task, setTask] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pomodoro = {
      fecha: new Date().toISOString(),
      inicio: new Date(start).toISOString(),
      final: new Date(end).toISOString(),
      tipo: type,
      task,
    };
    
    console.log(pomodoro);

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/pomodoros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pomodoro),
      });
      console.log(response);
      if (response.ok) {
        onClose();
      } else {
        console.error('Error creating pomodoro:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating pomodoro:', error);
    }
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Pomodoro</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="start" className="form-label">Inicio</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="start"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="end" className="form-label">Final</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="end"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="type" className="form-label">Type</label>
                <select
                  className="form-select"
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="Pomodoro">Pomodoro</option>
                  <option value="Descanso">Descanso</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="task" className="form-label">Task</label>
                <input
                  type="text"
                  className="form-control"
                  id="task"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroForm;
