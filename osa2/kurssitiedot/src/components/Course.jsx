const Header = (props) => {
    console.log(props)
    const { course } = props
    return (
        <div>
        <h2>{props.name}</h2>
        </div>
    )
}

const Total = (props) => {
    console.log(props)
    const { parts } = props
    const sum = parts.reduce((total, part) => total + part.exercises, 0)
    return (
        <b>Total of {sum} exercises</b>
    )
} 

const Part = (props) => {
    console.log(props)
    const { part } = props
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = (props) => {
    console.log(props)
    const { parts } = props
    return (
        parts.map(part => <Part key={part.id} part={part} />)
    )
}

const Course = (props) => {
    console.log(props)
    const { course } = props
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course