import Student from "../Student/Student"
import api from "../../api";

export default function StudentList({ data, setStudentData, setUpdatedStudent }) {

    const editStudent = (student) => {
        setUpdatedStudent(student)
    }

    const remove = ( id ) => {
        api.delete(id);
        const deletedData = data.filter(i => i.id !== id)
        setStudentData(deletedData)
    }
    
    return (
        <div className="student-list">
            {data.map((student, indx) => (
                    <Student student={student} key={indx} remove={remove} editStudent={editStudent} />
                )
            )}
        </div>
    )
}