"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
    ssr: false,
});


const BarChart = ({ label }: { label: string }) => {

    const data = {
        labels: ['Enero', 'Febrero', "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Noviembre", "Diciembre"],
        datasets: [
            {
                label: label,
                data: [65, 59, 80, 81, 56, 65, 59, 80, 81, 55, 98],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };
    return (
        <div className='h-100' style={{ position: "relative", height: "300px" }}>
            <Line data={data} />
        </div>

    );
};
export default BarChart;