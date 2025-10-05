"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
    ssr: false,
});


const BarChart = ({ label, results }: { label: string, results?: { month: string, money: string }[] }) => {

    const cleanNumber = (number: string) => {
        return parseFloat(number.replace(/\./g, "").replace(",", "."))
    }

    const data = {
        labels:
            results ? results.map((g) => g.month) : ['Enero', 'Febrero', "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Noviembre", "Diciembre"],
        datasets: [
            {
                label: label,
                data: results ? results.map((r) => cleanNumber(r.money)) : [65, 59, 80, 81, 56, 65, 59, 80, 81, 55, 98],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context: any) =>
                        `${context.dataset.label}: ${context.parsed.y.toLocaleString("es-ES", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}`,
                },
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: (value: number | string) =>
                        Number(value).toLocaleString("es-ES", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }),
                },
            },
        },
    };

    return (
        <div className='h-100' style={{ position: "relative", height: "300px" }} >
            <Line data={data} options={options} />
        </div >

    );
};
export default BarChart;