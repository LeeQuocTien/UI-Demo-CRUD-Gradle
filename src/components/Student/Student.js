export default function Student({student, remove, editStudent}) {
    return(
        <div className="student" data-testid={`student-div-${student.id}`} >
            <div className="student-inf-id">ID: {student.id}</div>
            <div className="student-inf">Name: {student.name}</div>
            <div className="student-inf">Email: {student.email}</div>
            <div className="student-inf">Age: {student.age}</div>
            <div className="btn-container">
                <button data-testid={`student-edit-${student.id}`} className="button" onClick={() => editStudent(student)}>Edit</button>
                <button data-testid={`student-remove-${student.id}`} className="button" onClick={() => remove(student.id)}>Delete</button>
            </div>
        </div>
    )
}