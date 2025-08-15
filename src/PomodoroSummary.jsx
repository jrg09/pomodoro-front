import React, { useState, useEffect } from 'react';

const PomodoroSummary = () => {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/pomodoros')
      .then(response => response.json())
      .then(pomodoroData => {
        const pomodorosData = Array.isArray(pomodoroData.pomodoros) ? pomodoroData.pomodoros : [];
        const pomodoros = pomodorosData.filter(item => item.tipo === 'Pomodoro');

        const summaryData = pomodoros.reduce((acc, curr) => {
          const date = new Date(curr.inicio).toLocaleDateString();
          const startTime = new Date(curr.inicio);
          const endTime = new Date(curr.final);
          const duration = (endTime - startTime) / (1000 * 60); // duration in minutes

          if (!acc[date]) {
            acc[date] = { sessions: 0, totalTime: 0 };
          }

          acc[date].sessions += 1;
          acc[date].totalTime += duration;

          return acc;
        }, {});

        const summaryArray = Object.keys(summaryData).map(date => {
          const hours = Math.floor(summaryData[date].totalTime / 60);
          const minutes = Math.round(summaryData[date].totalTime % 60);
          return {
            date,
            sessions: summaryData[date].sessions,
            totalTime: `${hours}:${String(minutes).padStart(2, '0')}`,
          };
        });

        setSummary(summaryArray);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="card my-2 h-100">
        <div className="card-header">
            Pomodoro Summary
        </div>
        <div className="card-body">
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Day</th>
                    <th>Sessions</th>
                    <th>Time (hours)</th>
                </tr>
                </thead>
                <tbody>
                {summary.map((row, index) => (
                    <tr key={index}>
                    <td>{row.date}</td>
                    <td>{row.sessions}</td>
                    <td>{row.totalTime}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default PomodoroSummary;
