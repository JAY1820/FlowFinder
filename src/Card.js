import React from 'react';

const Card = ({ card }) => {
  return (
    <div className="card">
      <p>{card.content}</p>
    </div>
  );
};

export default Card;
