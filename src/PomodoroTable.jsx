import React, { useState, useEffect } from 'react';

const PomodoroTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState('Pomodoro');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/pomodoros')
      .then(response => response.json())
      .then(data => {
        const pomodoros = Array.isArray(data.pomodoros) ? data.pomodoros : [];
        setData(pomodoros);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    let filtered = data;
    
    // Filter by type
    if (filter !== 'All') {
      filtered = filtered.filter(item => item.tipo === filter);
    }
    
    // Filter by date
    if (selectedDate) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.inicio);
        const filterDate = new Date(`${selectedDate}T00:00:00`);
        return itemDate.toDateString() === filterDate.toDateString();
      });
    }
    
    setFilteredData(filtered);
  }, [filter, data, selectedDate]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const clearDateFilter = () => {
    setSelectedDate('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return dateString;
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className='card my-4 p-2'>
      <div className="mb-3">
        <select className="form-select mb-2" value={filter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Pomodoro">Pomodoro</option>
          <option value="Descanso">Descanso</option>
        </select>
        <div className="d-flex gap-2">
          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={handleDateChange}
            placeholder="Filter by date"
          />
          <button 
            type="button" 
            className="btn btn-outline-secondary"
            onClick={clearDateFilter}
            disabled={!selectedDate}
          >
            Clear
          </button>
        </div>
      </div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th >Inicio</th>
            <th >Final</th>
            <th >Tipo</th>
            <th className="task-column">Task</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td>{formatDate(row.inicio)}</td>
              <td>{formatDate(row.final)}</td>
              <td>{row.tipo}</td>
              <td className="task-column">{row.task}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PomodoroTable;
