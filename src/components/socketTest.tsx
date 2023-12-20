import React, { useState } from 'react';
import io from 'socket.io-client';
//import { useNavigate } from 'react-router-dom';

const SocketTest: React.FC = () => {
  const [messageInput, setMessageInput] = useState<string>(''); // State to store the input value
  
  const socket = io('http://localhost:3001', {
    // withCredentials: true,
    extraHeaders: {"Content-Type": "Authorization"}
  });

  const message = document.getElementById('message');
  const messages = document.getElementById('messages');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('HELLO');

    socket.emit('joinMatchRoom', partidoid);
    console.log(`room created for match ${partidoid}`)
    //navigate(`/referee/${partidoid}`)    // don't know how to go to the right room here for the referee..
  };

  const handleSubmitNewMessage = () => {
    socket.emit('message', {data: message.value})
  }

 socket.on('message', ({data}) => {
    handleNewMessage(data)
 })

 const handleNewMessage = (message) => {
    messages?.appendChild(buildNewMessage(message));
 }

 const buildNewMessage = (message) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(message))
    return li;
 }

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value); 
  };

  return (
    <div>
      <input type="text" onChange={handleMessageChange}></input>
      <button onClick={handleSubmitNewMessage}></button>
      <div>
        <ul id="message"></ul>
      </div>
    </div>
  );
};

export default SocketTest;