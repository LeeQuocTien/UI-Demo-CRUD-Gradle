export default function Student({student, indx, editStudent, remove}) {
    return(
        <div className="student">
            <div className="student-inf-id">ID: {student.id}</div>
            <div className="student-inf">Name: {student.name}</div>
            <div className="student-inf">Email: {student.email}</div>
            <div className="student-inf">Age: {student.age}</div>
            <div className="btn-container">
                <button className="button" onClick={() => editStudent(student, indx)}>Edit</button>
                <button className="button" onClick={() => remove(student.id, indx)}>Delete</button>
            </div>
        </div>
    )
}