import io from 'socket.io-client';
import { useEffect, useState } from 'react';
//import BasketballMatchChart from './Charts/BasketballMatchChart';

const socket = io('http://localhost:3001');

const GameViewer = () => {
  const [partidoId, setPartidoId] = useState('');
  const [gameData, setGameData] = useState(null);
  const [foulUpdates, setFoulUpdates] = useState<any[]>([]);
  const [scoreUpdates, setScoreUpdates] = useState<any[]>([]);
  const [localScore, setLocalScore] = useState(0);
  const [visitanteScore, setVisitanteScore] = useState(0); 

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server!');
    });

    socket.on('gameUpdate', (data) => {
      console.log(data);
      setGameData(data);
    });

    socket.on('foulUpdate', (data) => {
      console.log(data);
      
      setFoulUpdates((prevUpdates) => [...prevUpdates, data]);
      console.log(data);
    });

    socket.on('scoreUpdate', (data) => {
      console.log(data);
      //this prints a list of the updates
      setScoreUpdates((prevUpdates) => [...prevUpdates, data]);
      console.log(data);
      //getting an error here now, not updating score to database, need to check backend again. 
      //I need to write a function to handle the logic for adding points to different teams. 
    });

    socket.on('scoreUpdateTeams', (data) => {
      console.log(data); 

      setLocalScore((prevUpdates) => prevUpdates + data.puntos);    //así que hay que separar los datos que llegan desde el back y solo coger puntos, no?
      console.log(data);
      console.log(localScore);

      setVisitanteScore((prevUpdates) => prevUpdates + data.puntos);
      console.log(data);
      console.log(visitanteScore);
    })

    socket.connect();
    return () => {
      socket.off('connect');
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('joinMatchRoom', partidoId);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPartidoId(e.target.value);
  };

  return (
    <div>
 <form onSubmit={handleSubmit}>
        <label>
          Enter Partido ID to join match room:
          <input
            type="text"
            value={partidoId}
            onChange={handleChange}
          />
          </label>
        <button type="submit">Join Room</button>
      </form>

      <h1>This is my match data:</h1>
      <p>{JSON.stringify(gameData)}</p>

      <h2>Foul Updates:</h2>
      <ul>
        {foulUpdates.map((update, index) => (
          <li key={index}>
            <p>Partido ID: {update.partidoId}</p>
            <p>Foul Data: {JSON.stringify(update.jugadorId)}</p>
          </li>  
        ))}
      </ul>

      <h2>Score Updates:</h2>
      <ul>
        {scoreUpdates.map((update, index) => (
          <li key={index}>
            <p>Partido ID: {update.partidoId}</p>
            <p>Score Data: {JSON.stringify(update.jugadorId)}</p>
            <p>Score Visitante</p>
          <p>{visitanteScore}</p>
          <p>Score Local</p>
          <p>{localScore}</p>
          </li> 
        ))}
      </ul>
{/*       <div>
        <p>Score Visitante</p>
        <p>{visitanteScore}</p>
      </div>
      <div>
        <p>Score Local</p>
        <p>{localScore}</p>
      </div> */}
    </div>
  );
};

export default GameViewer;
