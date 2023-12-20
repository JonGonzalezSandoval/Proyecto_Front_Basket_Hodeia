import React, { useState } from 'react';
import io from 'socket.io-client';
//import { useNavigate } from 'react-router-dom';

const CreateRoomForm: React.FC = () => {
  const [partidoid, setPartidoid] = useState<string>(''); // State to store the input value
  //const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('HELLO');
    
    const socket = io('http://localhost:3001', {
      // withCredentials: true,
      extraHeaders: {"Content-Type": "Authorization"}
    }); // Connect to your Socket.IO server

    // Send the partidoid to the server to create the room
    socket.emit('joinMatchRoom', partidoid);
    console.log(`room created for match ${partidoid}`)
    //navigate(`/referee/${partidoid}`)    // don't know how to go to the right room here for the referee..
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPartidoid(e.target.value); 
  };

  return (
    <div>
      <h1>Create Room Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Partido ID:
          <input type="text" value={partidoid} onChange={handleChange} />
        </label>
        <button type="submit">Create Room</button>
      </form>
    </div>
  );
};

export default CreateRoomForm;
