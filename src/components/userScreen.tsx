import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import BasketballMatchChart from './Charts/BasketballMatchChart';


const GameViewer = () => {
  const [gameData, setGameData] = useState(null);
  const [foulUpdates, setFoulUpdates] = useState<any[]>([]);
  const [scoreUpdates, setScoreUpdates] = useState<any[]>([]);
  const [matchRoomId, setMatchRoomId] = useState('');
  
  
  const socket = io('http://localhost:3001');
  const handleUserJoinMatchRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('llamo al back');
    if (matchRoomId.trim() !== ''){
      socket.emit('joinMatchRoom', matchRoomId.trim());
      console.log(`joined room  for match ${matchRoomId}`)
    }
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server!');
    });

    socket.on('gameUpdate', (data) => {
      setGameData(data);
    });

    socket.on('foulUpdate', (data) => {
      setFoulUpdates((prevUpdates) => [...prevUpdates, data]);
    });

    socket.on('scoreUpdate', (data) => {
      setScoreUpdates((prevUpdates) => [...prevUpdates, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
 <form onSubmit={handleUserJoinMatchRoom}>
        <label>
          Enter Partido ID to join match room:
          <input
            type="text"
            value={matchRoomId}
            onChange={(e) => setMatchRoomId(e.target.value)}
          />
        </label>
        <button type="submit">Join Room</button>
      </form>

      <h1>This is my match data:</h1>
      <p>{JSON.stringify(gameData)}</p>

      <div>
        <ul id="message"></ul>
      </div>

      <h2>Foul Updates:</h2>
      <ul>
        {foulUpdates.map((update, index) => (
          <li key={index}>
            <p>Partido ID: {update.partidoid}</p>
            <p>Foul Data: {JSON.stringify(update.foulData)}</p>
          </li>  //think there might be an issue here with the foul data. 
        ))}
      </ul>
      <h2>Score Updates:</h2>
      <ul>
        {scoreUpdates.map((update, index) => (
          <li key={index}>
            <p>Partido ID: {update.partidoid}</p>
            <p>Score Data: {JSON.stringify(update.newScore)}</p>
          </li>  //think there might be an issue here with the foul data. 
        ))}
      </ul>
      <div>
      <h1>Basketball Match Chart</h1>
    {/*   <BasketballMatchChart matchID={matchID} /> */}
      </div>
    </div>
  );
};

export default GameViewer;
