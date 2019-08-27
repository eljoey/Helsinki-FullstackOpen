import React from 'react';

const Parts = ({ parts }) => {
  console.log(parts);

  return parts.map(part => (
    <div key={part.id}>
      {part.name} {part.exercises}
    </div>
  ));
};

export default Parts;
