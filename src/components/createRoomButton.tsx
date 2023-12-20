import React, { useState } from 'react';
import io from 'socket.io-client';

const CreateRoomForm: React.FC = () => {
  const [partidoid, setPartidoid] = useState<string>(''); 
  //const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('HELLO');
    
    const socket = io('http://localhost:3001', {
      // withCredentials: true,
      extraHeaders: {"Content-Type": "Authorization"}
    }); // esto es para conectar al servidor

    // Esto manda el partidoid al servidor para crear la sala
    socket.emit('joinMatchRoom', partidoid);
    console.log(`room created for match ${partidoid}`)
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
