import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

const PomodoroChart = () => {
  const [chartData, setChartData] = useState([]);

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
            acc[date] = { totalTime: 0 };
          }

          acc[date].totalTime += duration;

          return acc;
        }, {});

        const chartArray = Object.keys(summaryData).map(date => {
          return {
            date,
            time: summaryData[date].totalTime,
          };
        });

        setChartData(chartArray);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = Math.round(time % 60);
    return `${hours}:${String(minutes).padStart(2, '0')}`;
  };

  return (
    <div className="card my-2 h-100">
        <div className="card-header">
            Pomodoro Chart
        </div>
        <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={formatTime} />
                    <Tooltip formatter={formatTime} />
                    <Legend />
                    <Bar dataKey="time" fill="#8884d8">
                        <LabelList dataKey="time" position="top" formatter={formatTime} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
};

export default PomodoroChart;