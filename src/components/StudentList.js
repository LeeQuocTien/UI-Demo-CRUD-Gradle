import Student from "./Student"

export default function StudentList({ data, editStudent, remove }) {
    return (
        <div className="student-list">
            {data.map((student, indx) => (
                    <Student student={student} indx={indx} key={indx} editStudent={editStudent} remove={remove} />
                )
            )}
        </div>
    )
}