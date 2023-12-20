import React, { useState } from 'react';
import BasketballMatchChart from './BasketballMatchChart';

const ScoresBarChart: React.FC = () => {
  const [matchID, setMatchID] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMatchID(event.target.value);
  };

  return (
    <div>
      <h1>Match Chart</h1>
      <input
        type="text"
        placeholder="Enter Match ID"
        value={matchID}
        onChange={handleInputChange}
      />
      {matchID && <BasketballMatchChart matchID={matchID} />}
    </div>
  );
};

export default ScoresBarChart;
