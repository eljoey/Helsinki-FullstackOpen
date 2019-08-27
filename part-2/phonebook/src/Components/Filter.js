import React from 'react';

const Filter = props => {
  return (
    <div>
      Filter by name{' '}
      <input value={props.search} onChange={props.handleSearch} />
    </div>
  );
};

export default Filter;
