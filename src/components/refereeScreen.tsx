import React, { useState } from 'react';
import io from 'socket.io-client';

const RefereeScreen: React.FC = () => {
  const [jugadorId, setJugadorId] = useState('');
  const [partidoId, setPartidoId] = useState('');
  const [points, setPoints] = useState('');
  const [foulJugadorId, setFoulJugadorId] = useState('');
  const [foulPartidoId, setFoulPartidoId] = useState('');
  const [matchRoomId, setMatchRoomId] = useState('');

  const socket = io('http://localhost:3001'); // Connect to your Socket.IO server

  const handleMatchRoomJoin = (e: React.FormEvent) => {
    e.preventDefault();

    // trying to connect to specifed match room here ??
    if (matchRoomId.trim() !== '') {      
      socket.emit('joinMatchRoom', matchRoomId.trim());
      console.log(`joined room  for match ${matchRoomId}`)
    }

    //setMatchRoomId('');
  };

  const handleGameUpdate = () => {
    console.log('gameupdate');
    
    socket.emit('gameUpdate', {nombre: 'Peio', apellido: 'murguia'})
  }

  const handlePointsSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Emit points scored data to the server
    socket.emit('pointsScored', {
      jugadorId,
      partidoId,
      points: parseInt(points, 10), // Convert points to a number
      partidoid: partidoId,
    });

    // Clear the form fields after submission
    setJugadorId('');
    setPartidoId('');
    setPoints('');
  };

  const handleFoulSubmission = (e: React.FormEvent) => {
    e.preventDefault();

    // data to the server but don't know how to send it to the right room as well ?? (to**)
    /* socket.to(`${partidoId}`).emit('foulupdate', */ 
    socket.emit('foulupdate', {
      jugadorId: foulJugadorId,
      partidoId: foulPartidoId,
    });

    setFoulJugadorId('');
    setFoulPartidoId('');
  };

  return (
    <div>
      {/* Form for entering points scored */}
      <form onSubmit={handleMatchRoomJoin}>
        <h2>Join Match Room</h2>
        <label>
          Enter Match Room ID:
          <input
            type="text"
            value={matchRoomId}
            onChange={(e) => setMatchRoomId(e.target.value)}
          />
        </label>
        <button type="submit">Join Room</button>
      </form>
    <button onClick={handleGameUpdate}>Probemos cosas</button>
      <form onSubmit={handlePointsSubmission}>
        <h2>Enter Points Scored</h2>
        <label>
          Jugador ID:
          <input
            type="text"
            value={jugadorId}
            onChange={(e) => setJugadorId(e.target.value)}
          />
        </label>
        <label>
          Partido ID:
          <input
            type="text"
            value={partidoId}
            onChange={(e) => setPartidoId(e.target.value)}
          />
        </label>
        <label>
          Points (1, 2, or 3):
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
          />
        </label>
        <button type="submit">Submit Points</button>
      </form>

      {/* Form for entering foul details */}
      <form onSubmit={handleFoulSubmission}>
        <h2>Enter Foul Details</h2>
        <label>
          Foul Jugador ID:
          <input
            type="text"
            value={foulJugadorId}
            onChange={(e) => setFoulJugadorId(e.target.value)}
          />
        </label>
        <label>
          Foul Partido ID:
          <input
            type="text"
            value={foulPartidoId}
            onChange={(e) => setFoulPartidoId(e.target.value)}
          />
        </label>
        <button type="submit">Submit Foul</button>
      </form>
    </div>
  );
};

export default RefereeScreen;
