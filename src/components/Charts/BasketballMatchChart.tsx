import { ChartOptions } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const BasketballMatchChart: React.FC = () => {
  const [matchData, setMatchData] = useState<any>({});
  const [partidoid, setPartidoid] = useState('');

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/matches/id/${partidoid}`); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setMatchData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMatchData();
  }, []);

  // Extracting scores for local and visitor teams
  const localTeamScore = matchData?.puntuacion_equipo_local || 0;
  const visitorTeamScore = matchData?.puntuacion_equipo_visitante || 0;

  const data = {
    labels: ['Local Team', 'Visitor Team'],
    datasets: [
      {
        label: 'Scores',
        data: [localTeamScore, visitorTeamScore],
        backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
      },
    ],
  };

  const options: any = {
    scales: {
      x: {
        type: 'category', // Define 'category' scale type for x-axis
      },
    },
  };

  return (
    <div>
      <h2>Match Scores</h2>
      <div style={{ width: '80%', margin: '0 auto' }}>
        <Bar data={data} options ={ options as any} />
      </div>
    </div>
  );
};

export default BasketballMatchChart;