import React from 'react';

const Total = ({ parts }) => {
  let total = parts.map(part => part.exercises).reduce((cur, acc) => cur + acc);

  return (
    <div>
      <b>Total of {total} exercises</b>
    </div>
  );
};

export default Total;
