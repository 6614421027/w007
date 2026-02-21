"use client";
import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};
export async function getData(){
  const res = await fetch('http://localhost:3000/api/graph01/')
  if (!res.ok){
    throw new Error("Failed to get data")
  }
  return res.json()
};




export function LineChart01() {
  const [data,setData] = useState({
    labels : [],
    datasets  : [
      {
        label: 'Total Gross',
        data : [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ]
  });


  useEffect(() => {
    async function fetchData(){
      const jsonData = await getData()
      console.log(jsonData)
      setData({
        labels : jsonData ? jsonData.map((item: { release_year: string; }) => item.release_year): [],
        datasets  : [
          {
            label: 'Total Gross',
            data : jsonData ? jsonData.map((item: { sum_total_gross: number; }) => item.sum_total_gross): [],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ]        
      })
    }
    fetchData()
  },[]);


  return (<Line data={data} options={options} />);
}
