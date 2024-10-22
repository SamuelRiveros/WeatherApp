import React, { forwardRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend, CategoryScale } from 'chart.js';

ChartJS.register(LinearScale, PointElement, LineElement, Filler, Tooltip, Legend, CategoryScale);

const DayForecast = forwardRef(({ temperatures }, ref) => {
    if (!temperatures.length) {
        return <div>Cargando...</div>;
    }

    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Temperatura (°C)',
                data: temperatures,
                fill: true,
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderColor: 'rgba(0, 0, 0, 1)',
                tension: 0.6,
                pointRadius: 4,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: false,
                min: Math.min(...temperatures) - 5,
                max: Math.max(...temperatures) + 5,
                ticks: {
                    callback: (value) => value + '°C',
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <div ref={ref} className="bg-[#EBDEFF] h-[240px] p-2 w-[93%] rounded-lg">
            <div className="flex">
                <div className="flex bg-white p-2 rounded-full w-[30px] h-[30px] items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1m-1 11h-5v5h5z"/>
                    </svg>
                </div>
                <h1 className="pl-3">Day Forecast</h1>
            </div>
            <Line data={data} options={options} />
        </div>
    );
});

export default DayForecast;
