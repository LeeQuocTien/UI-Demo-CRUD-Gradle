import Student from "./Student"

export default function StudentList({data, setInputStudent, setIsCreate, remove}) {

    return(
        <div className="student-list">
            {data.map((student, key) => {
                return (
                    <Student student={student} key={key} setInputStudent={setInputStudent} setIsCreate={setIsCreate} remove={remove} />
                )
            })}
        </div>
    )
}