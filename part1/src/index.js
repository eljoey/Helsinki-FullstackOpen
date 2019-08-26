import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = props => {
  return (
    <div>
      <Part parts={props.part1.name} exercises={props.part1.exercises} />
      <Part parts={props.part2.name} exercises={props.part2.exercises} />
      <Part parts={props.part3.name} exercises={props.part3.exercises} />
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
  console.log(props);
  return (
    <p>
      Number of exercises{' '}
      {props.part1.exercises + props.part2.exercises + props.part3.exercises}
    </p>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14
  };

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total part1={part1} part2={part2} part3={part3} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
