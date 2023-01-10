import Part from "./Part";

const Content = ({ parts }) => {
    const total = parts.reduce((s, p) => {
        return s + p.exercises;
    }, 0)
    return (
        <>
            {parts.map((part) => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
            <p><strong>totol of {total} exercises</strong></p>

        </>
    )
}
export default Content;