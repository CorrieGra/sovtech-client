import './Card.css';
import React, { memo } from 'react';
import { motion } from 'framer-motion';

export const Card = memo(({ person }: any) => {
  const animations = {
    initial: {
      opacity: 0,
      right: 500,
    },
    animate: (i: number) => ({
      opacity: 1,
      right: 0,
      transition: {
        delay: i * 0.5,
      },
    }),
  };

  return (
    <div className="card">
      <div className="card__showcase">
        <p>{ person.name }</p>
      </div>
      <div className="card__details">
        <p id="height">Height: { person.height }</p>
        <p id="mass">Mass: { person.mass }</p>
        <p id="gender">Gender: { person.gender }</p>
        <p id="homeworld">Homeworld: { person.homeworld }</p>
      </div>
    </div>
  );
});
