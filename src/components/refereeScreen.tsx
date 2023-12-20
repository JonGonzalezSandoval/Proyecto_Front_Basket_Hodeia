import React, { useState } from 'react';
import io from 'socket.io-client';

const RefereeScreen: React.FC = () => {
  //const [jugadorId, setJugadorId] = useState('');
  const [partidoId, setPartidoId] = useState('');
  const [scoreJugadorId, setScoreJugadorId] = useState('');
  const [scorePartidoId, setScorePartidoId] = useState('');
  const [puntos, setPuntos] = useState('');
  const [foulJugadorId, setFoulJugadorId] = useState('');
  const [foulPartidoId, setFoulPartidoId] = useState('');
  //const [matchRoomId, setMatchRoomId] = useState('');

  const socket = io('http://localhost:3001'); // --> para conectar al servidor (io)

/*   const handleMatchRoomJoin = (e: React.FormEvent) => {
    e.preventDefault();

    // esto era para conectar con una sala en concreta
    if (matchRoomId.trim() !== '') {      
      socket.emit('joinMatchRoom', matchRoomId.trim());
      console.log(`joined room  for match ${matchRoomId}`)
    }
  }; */

  const handleGameUpdate = () => {
    socket.emit('gameUpdate', {socketId:socket.id, roomName: partidoId })
    console.log('gameupdate');
  }

  const handlePointsSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Emit points scored data to the server
    socket.emit('scoreUpdateTeams', {    //or formerly scoreUpdate
      jugadorId: scoreJugadorId,
      partidoId: scorePartidoId,
      puntos: parseInt(puntos),
    });

    setScoreJugadorId('');
    setScorePartidoId('');
    setPuntos('');
  };

  const handleFoulSubmission = (e: React.FormEvent) => {
    e.preventDefault();

    socket.emit('foulUpdate', {
      jugadorId: foulJugadorId,
      partidoId: foulPartidoId,
    });

    setFoulJugadorId('');
    setFoulPartidoId('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Send partidoid to server
    socket.emit('joinMatchRoom', partidoId);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPartidoId(e.target.value); // Update partidoid state as the user types
  };

  return (
    <div>
      {/*para los puntos marcados*/}
      <form onSubmit={handleSubmit}>
        <h2>Join Match Room</h2>
        <label>
          Enter Match Room ID:
          <input
            type="text"
            value={partidoId}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Join Room</button>
      </form>
    <button onClick={handleGameUpdate}>Let's try</button>
      <form onSubmit={handlePointsSubmission}>
        <h2>Enter Points Scored</h2>
        <label>
          Jugador ID:
          <input
            type="text"
            value={scoreJugadorId}
            onChange={(e) => setScoreJugadorId(e.target.value)}
          />
        </label>
        <label>
          Partido ID:
          <input
            type="text"
            value={scorePartidoId}
            onChange={(e) => setScorePartidoId(e.target.value)}
          />
        </label>
        <label>
          Points (1, 2, or 3):
          <input
            type="text"
            value={puntos}
            onChange={(e) => setPuntos(e.target.value)}
          />
        </label>
        <button type="submit">Submit Points</button>
      </form>

      {/* Formulario para introducir los datos de la falta */}
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
