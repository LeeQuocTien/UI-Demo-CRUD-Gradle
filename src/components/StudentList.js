import Student from "./Student"
import api from "../Api";

export default function StudentList({ data, setStudentData, setUpdatedStudent }) {

    const remove = ( id ) => {
        api.delete(id);
        const deletedData = data.filter(i => i.id !== id)
        setStudentData(deletedData)
    }
    return (
        <div className="student-list">
            {data.map((student, indx) => (
                    <Student student={student} indx={indx} key={indx} remove={remove} setUpdatedStudent={setUpdatedStudent} />
                )
            )}
        </div>
    )
}