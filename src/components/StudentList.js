import Student from "./Student"

export default function StudentList({data, setLoadData, setInputStudent, setIsCreate, remove}) {

    return(
        <div className="student-list">
            {data.map((student, key) => {
                return (
                    <Student student={student} key={key} setLoadData={setLoadData} setInputStudent={setInputStudent} setIsCreate={setIsCreate} remove={remove} />
                )
            })}
        </div>
    )
}