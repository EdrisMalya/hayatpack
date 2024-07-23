import React from 'react'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import { Line } from 'react-chartjs-2'

export default function LineChart() {
    Chart.register(CategoryScale)
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'First dataset',
                data: [33, 53, 85, 41, 44, 65],
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
            },
            {
                label: 'Second dataset',
                data: [33, 25, 35, 51, 54, 76],
                fill: false,
                borderColor: '#742774',
            },
        ],
    }
    return (
        <div className="App">
            <Line data={data} />
        </div>
    )
}
