import Header from "./Header";
import Content from "./Content";

const Course = ({ courses }) => (
    <>
        {courses.map((course) => (
            <div key={course.id}>
                <Header header={course.name} />
                <Content parts={course.parts} />
            </div>
        ))}


    </>
)

export default Course;