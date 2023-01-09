const Header = ({ course }) => (
  <h1>{course}</h1>
)

const Part = ({ part, exerciseCount }) => (
  <p>
    {part} {exerciseCount}
  </p>
)

const Total = ({ exerciseTotal }) => (
  <p>Number of exercises {exerciseTotal}</p>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Part part={course.parts[0].name} exerciseCount={course.parts[0].exercises} />
      <Part part={course.parts[1].name} exerciseCount={course.parts[1].exercises} />
      <Part part={course.parts[2].name} exerciseCount={course.parts[2].exercises} />
      <Total exerciseTotal={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    </div>
  )
}

export default App