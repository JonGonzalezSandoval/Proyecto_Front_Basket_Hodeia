import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';

interface TeamDetails {
  name: string;
  score: number;
}
//const [matchID, setMatchID] = useState("")
const BasketballMatchChart: React.FC = () => {

  const {matchID} = useParams();

  const [teamDetails, setTeamDetails] = useState<TeamDetails[] >([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/matches/teamsplayersdate/${matchID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTeamDetails([
          { name: data.localTeamDetails.nombre, score: data.puntuacion_equipo_local},
          { name: data.visitorTeamDetails.nombre, score: data.puntuacion_equipo_visitante},
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (matchID) {
      fetchData();
    }
  }, [matchID]);

  const teamNames = teamDetails.map((team) => team.name);
  const teamScores = teamDetails.map((team) => team.score);

  const data = {
    labels: teamNames,
    datasets: [
      {
        label: 'Scores',
        data: teamScores,
        backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
      },
    ],
  };

  return (
    <div>
      <h2>Match Details</h2>
      <div style={{ width: '80%', margin: '0 auto' }}>
        <Bar data={data} />
      </div>
    </div>
  );
};

export default BasketballMatchChart;

