import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = props => {
  return (
    <div>
      <Part parts={props.part[0].name} exercises={props.part[0].exercises} />
      <Part parts={props.part[1].name} exercises={props.part[1].exercises} />
      <Part parts={props.part[2].name} exercises={props.part[2].exercises} />
    </div>
  );
};

const Part = props => {
  return (
    <p>
      {props.parts} {props.exercises}
    </p>
  );
};

const Total = props => {
  return (
    <p>
      Number of exercises{' '}
      {props.part[0].exercises +
        props.part[1].exercises +
        props.part[2].exercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  };

  return (
    <div>
      <Header course={course.name} />
      <Content part={course.parts} />
      <Total part={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
